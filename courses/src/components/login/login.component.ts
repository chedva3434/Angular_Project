import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.authService.login(credentials).subscribe({
        next: (response) => {
          if (!response || !response.token || !response.userId || !response.role) {
            console.error('Invalid response from server:', response);
            return;
          }
          console.log('User logged in:', response);

          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('userId', response.userId.toString());
          sessionStorage.setItem('role', response.role); // שמירת ה-role
          // localStorage.setItem('role', response.role);  // שמירת התפקיד
          // localStorage.setItem('token', response.token);  // שמירת ה-token
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Login failed:', error);
        }
      });
    }

  }
}

