import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { FormsModule } from '@angular/forms';
import { BehaviorService } from 'src/app/shared-services/behavior.service';

@Component({
  selector: 'app-account-creation',
  templateUrl: './account-creation.component.html',
  styleUrl: './account-creation.component.css',
  imports: [FormsModule],
  standalone: true
})
export class AccountCreationComponent implements OnInit{
  name: string = '';
  bank: string = '';
  userId: number | null;

  constructor(
    private accountService: AccountService,
    private behaviorService: BehaviorService,
    private router: Router
  ) {}

  ngOnInit() {

    // BehaviorService => récupération User connecté ( dans observable$ )
    this.behaviorService.currentUser$.subscribe((u) => {
      console.log('AccountCreation => User ID', u);

      if (u) {
        this.userId = u;
      }
    })
  }

  addNewAccount() {

    if(this.userId){

      // AccountService => pour créer un account
      this.accountService.newAccount(this.name, this.bank, this.userId).subscribe({

        next:(newAccount) => {
          console.log('Account successfully created', newAccount);
          this.router.navigate(['/account/list']);
        },

        error: (error) => console.error('Error creating account:', error),
      })

    } else {
      console.error('UserId undefined');
    }
  }
}
