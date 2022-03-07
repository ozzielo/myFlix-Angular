import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SummaryCardComponent } from '../summary-card/summary-card.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  FavMovies: any = [];

  constructor(public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

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

  /**
  *open a dialog to display the GenreCardComponent
  * @param name {string}
  * @param description {string}
  */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { name: name, description: description },
      width: '300px',
    });
  }

  /**
   * open a dialog to display the DirectorCardComponent
   * @param name {string}
   * @param bio {string}
   * @param birth {string}
   * @param death {string}
   */
  openDirectorDialog(
    name: string,
    bio: string,
    birth: string,
    death: string
  ): void {
    this.dialog.open(DirectorCardComponent, {
      data: { name: name, bio: bio, birth: birth, death: death },
      width: '300px',
    });
  }

  /**
   * open a dialog to display the SynopsisCardComponent
   * @param title {string}
   * @param description {string}
   */
  openSummaryDialog(title: string, description: string): void {
    this.dialog.open(SummaryCardComponent, {
      data: { title: title, description: description },
      width: '300px',
    });
  }

  addFavoriteMovies(MovieID: string, title: string): void {
    this.fetchApiData.addFavoriteMovies(MovieID).subscribe((resp: any) => {
      this.snackBar.open(`${title} has been added to your favorites!`, 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    });
  }
  getFavoriteMovies(): void {
    const user = JSON.parse(localStorage.getItem('user') || '');
    this.fetchApiData.getUserProfile(user.Username).subscribe((res: any) => {
      this.FavMovies = res.FavoriteMovies;
      console.log(this.FavMovies, "222");
    });
    return this.FavMovies;
  }

  removeFavoriteMovie(MovieId: string, title: string): void {
    this.fetchApiData.deleteFavoriteMovies(MovieId).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(
        `${title} has been removed from your favorites!`,
        'OK',
        {
          duration: 4000,
        }
      );
      this.ngOnInit();
    });
  }


  isFavorite(MovieID: string): boolean {
    return this.FavMovies.some((movie: any) => movie === MovieID);
  }

  toggleFavorite(movie: any): void {
    this.isFavorite(movie._id)
      ? this.removeFavoriteMovie(movie._id, movie.Title)
      : this.addFavoriteMovies(movie._id, movie.Title);
  }
}

