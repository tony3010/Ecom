import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.services';
import { FormBuilder,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInput } from '@angular/material/input';
import { MatFormField, } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone:true,
  imports:[ReactiveFormsModule,ReactiveFormsModule,MatCard,MatToolbarModule,MatInput,MatFormField,NgIf,CommonModule]
})
  export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;
    isSignUpFailed = false;
    errorMessage = '';
  

  constructor( private authService:AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const { username, email, password } = this.registerForm.value;
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
  
    this.authService.register({ username, email, password }).subscribe({
      next: data => {
        console.log(data);
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message || 'Registration failed!';
        this.isSignUpFailed = true;
      }
    });
  
  }
}
