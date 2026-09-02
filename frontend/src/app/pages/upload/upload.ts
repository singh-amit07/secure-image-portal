import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  imports: [RouterLink],
  templateUrl: './upload.html',
  styleUrl: './upload.css'
})
export class Upload {

  selectedFiles: File[] = [];

  previews: string[] = [];

  isUploading = false;

  message = '';
  error = '';

 constructor(
  private http: HttpClient,
  private cdr: ChangeDetectorRef
) {}


 
  onFileSelected(event: Event) {

    this.message = '';
    this.error = '';

    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    this.selectedFiles = Array.from(input.files);

    this.previews = [];

    
    this.selectedFiles.forEach((file) => {

      const reader = new FileReader();

      reader.onload = () => {
        this.previews.push(reader.result as string);
      };

      reader.readAsDataURL(file);
    });

  }


  uploadImages() {

    this.message = '';
    this.error = '';

    if (this.selectedFiles.length === 0) {

      this.error = 'Please select at least one image';

      return;
    }

    this.isUploading = true;

    const formData = new FormData();

    this.selectedFiles.forEach((file) => {

      formData.append('images', file);

    });

    const token = localStorage.getItem('token');

    this.http.post<any>(
      'https://secure-image-portal.onrender.com/api/images/upload',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe({

     next: (response) => {

  console.log('Upload Response:', response);

  this.message = 'Images uploaded successfully!';

  this.selectedFiles = [];
  this.previews = [];

  setTimeout(() => {

    this.isUploading = false;

    this.cdr.detectChanges();

  }, 0);

},

      error: (error) => {

  console.log('Upload Error:', error);

  this.error =
    error.error?.message || 'Image upload failed';

  setTimeout(() => {

    this.isUploading = false;

    this.cdr.detectChanges();

  }, 0);

}

    });

  }


  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    window.location.href = '/login';

  }

}