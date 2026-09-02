import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

  name = '';
  email = '';
  phone = '';
  address = '';

  message = '';
  error = '';

  isSaving = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getProfile();
  }


  getProfile() {

    const token = localStorage.getItem('token');

    this.http.get<any>(
      'http://localhost:5000/api/user/profile',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe({

      next: (response) => {

        console.log('Profile:', response);

        this.name = response.user.name;
        this.email = response.user.email;
        this.phone = response.user.phone || '';
        this.address = response.user.address || '';

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.log('Profile Error:', error);

        if (error.status === 401) {

          localStorage.removeItem('token');
          localStorage.removeItem('user');

          this.router.navigate(['/login']);

        } else {

          this.error = 'Unable to load profile';

        }

        this.cdr.detectChanges();
      }

    });
  }

  updateProfile() {

    this.message = '';
    this.error = '';

    this.isSaving = true;

    const profileData = {
      name: this.name,
      phone: this.phone,
      address: this.address
    };

    const token = localStorage.getItem('token');

    this.http.put<any>(
      'http://localhost:5000/api/user/profile',
      profileData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe({

      next: (response) => {

        console.log('Update Profile:', response);

        this.message = 'Profile updated successfully!';

        this.isSaving = false;

        this.cdr.detectChanges();

        console.log('isSaving:', this.isSaving);
      },

      error: (error) => {

        console.log('Update Error:', error);

        this.error =
          error.error?.message || 'Profile update failed';

        this.isSaving = false;

        this.cdr.detectChanges();

        console.log('isSaving:', this.isSaving);
      }

    });
  }


  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['/login']);
  }

}