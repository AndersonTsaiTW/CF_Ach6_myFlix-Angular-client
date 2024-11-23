// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MessageBoxComponent } from '../message-box/message-box.component';

/**
 * Component representing a movie card list.
 *
 * This component is responsible for displaying a list of movies, handling user interactions such as
 * adding or removing favorite movies, and showing detailed information about genres, directors,
 * and synopses.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovies: any[] = [];

  /**
   * Creates an instance of the MovieCardComponent.
   *
   * @param fetchApiData - Service for fetching movie-related data from the API.
   * @param router - Service for navigating between routes.
   * @param dialog - Service for opening dialogs.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog
  ) {}

  /**
   * Lifecycle hook that is called after the component has been initialized.
   * Fetches the list of movies and the user's favorite movies.
   */
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

  /**
   * Adds or removes a movie from the user's list of favorite movies.
   *
   * If the movie is already a favorite, it is removed. Otherwise, it is added.
   *
   * @param movieId - The ID of the movie to be added or removed from favorites.
   */
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
