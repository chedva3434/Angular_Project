import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['student', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Server response:', response); // בדיקה
          if (response.token && response.role) {
            localStorage.setItem('token', response.token);  // שמירת ה-token ב-localStorage
            sessionStorage.setItem('token', response.token);
            localStorage.setItem('userRole', response.role);
            sessionStorage.setItem('role', response.role);
            console.log('Role saved:', response.role); // בדיקה
          } else {
            console.error('Role is missing in response:', response);
          }
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Registration error:', error);
        }
      });
    }
  }

}
