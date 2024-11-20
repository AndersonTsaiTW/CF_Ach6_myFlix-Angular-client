// src/app/movie-card/user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  // userData should be an object not an array
  userData: any = {};
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    private snackBar: MatSnackBar
  ) {
    this.userData = JSON.parse(localStorage.getItem('user') || '{}');
  }

  // initialize Component by using getUser
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    console.log('Stored Token:', token);
    if (!token) {
      console.error('Token is missing or invalid');
      return;
    }

    // feedback1:
    this.fetchApiData.userData$.subscribe((data) => {
      this.userData = data; // Update local user data when changes occur
    });

    this.getUser();
    this.getfavoriteMovies();
  }

  // get the user data
  getUser(): void {
    this.fetchApiData.getUser().subscribe(
      (res: any) => {
        this.userData = {
          ...res,
          password: '',
          Birth_date: res.Birth_date ? res.Birth_date.split('T')[0] : '',
          FavMovies: res.FavMovies || [],
          token: localStorage.getItem('token') || '',
        };
        // store user to localStorage
        localStorage.setItem('user', JSON.stringify(this.userData));

        // get log
        console.log('User Data:', this.userData);
        console.log('Favorite Movies from API:', this.userData.FavMovies);
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  updateUser(): void {
    const updatedUser = {
      Username: this.userData.Username,
      Password: this.userData.password,
      Email: this.userData.Email,
      Birth_date: this.userData.Birth_date,
    };

    this.fetchApiData.editUser(updatedUser).subscribe(
      (res: any) => {
        console.log('User updated successfully', res);
        this.userData = res;
        localStorage.setItem('user', JSON.stringify(this.userData));

        // Show success SnackBar
        this.snackBar.open('Profile updated successfully!', 'OK', {
          duration: 3000,
        });
      },
      (err: any) => {
        console.error('Error updating user:', err);

        // Show error SnackBar
        this.snackBar.open(
          'Failed to update profile. Please try again.',
          'OK',
          {
            duration: 3000,
          }
        );
      }
    );
  }

  resetUser(): void {
    this.userData = JSON.parse(localStorage.getItem('user') || '');
    this.snackBar.open('Profile reset to the last saved state.', 'OK', {
      duration: 3000,
    });
  }

  backToMovie(): void {
    this.router.navigate(['movies']);
  }

  getfavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe(
      (res: any) => {
        this.favoriteMovies = res.filter((movie: any) => {
          return this.userData.FavMovies.includes(movie._id);
        });
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  removeFromFavorite(movie: any): void {
    this.fetchApiData.deleteFavoriteMovie(movie._id).subscribe(
      (res: any) => {
        this.userData.FavMovies = res.FavMovies;
        this.getfavoriteMovies();
      },
      (err: any) => {
        console.error('Error removing favorite movie:', err);
      }
    );
  }

  logout(): void {
    this.router.navigate(['/welcome']);
    localStorage.removeItem('user');
  }
}
