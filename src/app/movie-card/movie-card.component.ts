// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MessageBoxComponent } from '../message-box/message-box.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  redirectProfile(): void {
    this.router.navigate(['profile']);
  }

  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.removeItem('user');
  }

  openMessageBox(title: string, content: string): void {
    this.dialog.open(MessageBoxComponent, {
      data: { title, content },
      width: '400px',
    });
  }

  showGenre(genreName: string): void {
    this.fetchApiData.getGenre(genreName).subscribe((genre: any) => {
      this.openMessageBox(`Genre: ${genre.Name}`, genre.Description);
    });
  }

  showDirector(directorName: string): void {
    this.fetchApiData.getDirector(directorName).subscribe((director: any) => {
      this.openMessageBox(
        `Director: ${director.Name}`,
        `Birth Year: ${director.Birth}\nBio: ${director.Bio}`
      );
    });
  }

  showSynopsis(movie: any): void {
    this.openMessageBox(movie.Title, movie.Description);
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((res: any) => {
      this.favoriteMovies = res.FavMovies; // store favMovie to favoriteMovies
      console.log('Favorite Movies:', this.favoriteMovies);
    });
  }

  switchFavorites(movieId: string): void {
    // check whether the movie has been stored or not
    const isFavorite = this.favoriteMovies.includes(movieId);

    if (isFavorite) {
      // if this movie is in fav list, delete it when click
      this.fetchApiData.deleteFavoriteMovie(movieId).subscribe(() => {
        this.openMessageBox('Success', 'Movie removed from favorites!');

        this.favoriteMovies = this.favoriteMovies.filter(
          (id: string) => id !== movieId
        );
      });
    } else {
      // else, add it
      this.fetchApiData.addFavoriteMovie(movieId).subscribe(() => {
        this.openMessageBox('Success', 'Movie added to favorites!');

        this.favoriteMovies.push(movieId);
      });
    }
  }
}
