import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-images',
  imports: [RouterLink],
  templateUrl: './images.html',
  styleUrl: './images.css'
})
export class Images implements OnInit {

  images: any[] = [];
  totalImages = 0;

  message = '';
  error = '';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getMyImages();
  }

  getMyImages() {

    const token = localStorage.getItem('token');

    this.http.get<any>(
      'https://secure-image-portal.onrender.com/api/images/my-images',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe({

      next: (response) => {

        console.log('My Images:', response);

        this.images = response.images || [];
        this.totalImages = response.totalImages || 0;

        
        this.cdr.detectChanges();

      },

      error: (error) => {

        console.log('Images Error:', error);

        this.error =
          error.error?.message || 'Unable to load images';

        this.cdr.detectChanges();
      }

    });
  }

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    window.location.href = '/login';

  }
}