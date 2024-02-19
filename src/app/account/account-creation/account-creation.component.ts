import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { BehaviorService } from 'src/app/shared-services/behavior.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-account-creation',
  templateUrl: './account-creation.component.html',
  styleUrl: './account-creation.component.css',
  imports: [ReactiveFormsModule],
  standalone: true
})
export class AccountCreationComponent implements OnInit{
  userId: number | null;
  reactiveAccountForm: FormGroup;

  constructor(
    private accountService: AccountService,
    private behaviorService: BehaviorService,
    private router: Router
  ) {}

  ngOnInit() {

    this.reactiveAccountForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]),
      bank: new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z ]+$")])
    })

    // BehaviorService => récupération User connecté ( dans observable$ )
    this.behaviorService.currentUser$.subscribe((u) => {
      console.log('AccountCreation => User ID', u);

      if (u) {
        this.userId = u;
      }
    })
  }

  //********************** Blur => msg d'erreur ************************/
  invalidField(fieldName: string) {
    const field = this.reactiveAccountForm.get(fieldName);
    if (field && field.invalid && field.value !== null) {
      if (fieldName === 'name') {
        this.behaviorService.notifState({type: 'error', message: 'Account name is required in a valid format'});
      } else if (fieldName === 'bank') {
        this.behaviorService.notifState({type: 'error', message: 'Account bank is required in a valid format'});
      }
    }
  }

  addNewAccount() {

    // ReactiveLoginForm => récupérer les values d'input
    const name: string = this.reactiveAccountForm.get('name').value;
    const bank: string = this.reactiveAccountForm.get('bank').value;

    if(this.userId && name && bank){

      // AccountService => pour créer un account
      this.accountService.newAccount(name, bank, this.userId).subscribe({

        next:(newAccount) => {
          console.log('Account successfully created', newAccount);
          this.behaviorService.notifState({type: 'success', message: 'Account successfully created'});
          this.router.navigate(['/account/list']);
        },

        error: (error) => {
          console.error('Error:', error),
          this.behaviorService.notifState({ type: 'error', message: error });
        }
      })

    } else {
      this.behaviorService.notifState({ type: 'error', message: 'All inputs must have a value' });
    }
  }
}
