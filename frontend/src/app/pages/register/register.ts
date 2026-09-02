import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  message = '';
  error = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  register() {

    this.message = '';
    this.error = '';

   
    if (this.password !== this.confirmPassword) {

      this.error = 'Passwords do not match';

      return;
    }

   
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.http
      .post('https://secure-image-portal.onrender.com/api/auth/register', userData)
      .subscribe({

        next: (response: any) => {

          console.log(response);

          this.message = 'Registration successful!';

          
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);

        },

        error: (error) => {

          console.log(error);

          this.error =
            error.error?.message ||
            'Registration failed';

        }

      });

  }

}
