import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';

  errorMessage = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login() {

    this.errorMessage = '';

    const loginData = {
      email: this.email,
      password: this.password
    };

    this.http
      .post<any>(
        'https://secure-image-portal.onrender.com/api/auth/login',
        loginData
      )
      .subscribe({

        next: (response) => {

          console.log('Login response:', response);

         
          localStorage.setItem(
            'token',
            response.token
          );

          
          localStorage.setItem(
            'user',
            JSON.stringify(response.user)
          );

          
          this.router.navigate(['/dashboard']);

        },

        error: (error) => {

          console.log('Login error:', error);

          this.errorMessage =
            error.error?.message ||
            'Login failed';

        }

      });

  }

}