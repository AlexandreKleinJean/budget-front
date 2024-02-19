import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { BehaviorService } from 'src/app/shared-services/behavior.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.css'],
  imports: [ReactiveFormsModule, RouterLink],
  standalone: true
})
export class AuthRegisterComponent {
  reactiveRegisterForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private behaviorService: BehaviorService
  ) {}

  ngOnInit(){
    this.reactiveRegisterForm = new FormGroup({
      gender: new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]),
      firstname: new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]),
      lastname: new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    })
  }

  //********************** Blur => msg d'erreur ************************/
  invalidField(fieldName: string) {
    const field = this.reactiveRegisterForm.get(fieldName);
    if (field && field.invalid && field.value !== null) {
      if (fieldName === 'gender') {
        this.behaviorService.notifState({type: 'error', message: 'Gender is required in a valid format'});
      } else if (fieldName === 'firstname') {
        this.behaviorService.notifState({type: 'error', message: 'Firstname is required in a valid format'});
      } else if (fieldName === 'lastname') {
        this.behaviorService.notifState({type: 'error', message: 'Lastname is required in a valid format'});
      } else if (fieldName === 'email') {
        this.behaviorService.notifState({type: 'error', message: 'Email is required in a valid format'});
      } else if (fieldName === 'password') {
        this.behaviorService.notifState({type: 'error', message: 'Password is required'});
      }
    }
  }

  onRegister() {

    // ReactiveRegisterForm => récupérer les values d'input
    const gender: string = this.reactiveRegisterForm.get('gender').value;
    const firstname: string = this.reactiveRegisterForm.get('firstname').value;
    const lastname: string = this.reactiveRegisterForm.get('lastname').value;
    const email: string = this.reactiveRegisterForm.get('email').value;
    const password: string = this.reactiveRegisterForm.get('password').value;

    // Je check que les champs sont remplis
    if(gender && firstname && lastname && email && password){

      // AuthService => créer un user en API
      this.authService.register(gender, firstname, lastname, email, password).subscribe({

        next:(u) => {
          console.log('Inscription réussie', u);
          this.behaviorService.notifState({type: 'success', message: 'Welcome to myBudget !'});
          this.router.navigate(['/auth/login']);
        },

        error: (error) => {
          console.error('Error:', error),
          this.behaviorService.notifState({ type: 'error', message: error });
        }
      })

    } else {
      this.behaviorService.notifState({type: 'error', message: 'All inputs must have a value'});
    }
  }
}
