import { Component, OnInit } from '@angular/core';
import {
  UserRegistrationService, User
} from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileFormComponent } from '../edit-profile-form/edit-profile-form.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SummaryCardComponent } from '../summary-card/summary-card.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any = {};

  FavMovies: any = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }


  getUserInfo(): void {
    let movies: any[] = [];
    const username = JSON.parse(localStorage.getItem('user') || '');
    if (username) {
      this.fetchApiData.getUserProfile(username.Username).subscribe((res: any) => {
        this.user = res;
      });
    }
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      movies = res;

      movies.forEach((movie: any) => {
        if (this.user.FavoriteMovies.includes(movie._id)) {
          this.FavMovies.push(movie);
        }
      });
    });

  }





  removeFavoriteMovie(MovieId: string, title: string): void {
    let movies: any[] = [];

    this.fetchApiData.deleteFavoriteMovies(MovieId).subscribe((resp: any) => {
      console.log(resp);
      this.user = resp;
      this.FavMovies = [];
      console.log(this.user);

      this.fetchApiData.getAllMovies().subscribe((res: any) => {
        movies = res;
        console.log(this.FavMovies)


        movies.forEach((movie: any) => {
          if (this.user.FavoriteMovies.includes(movie._id)) {
            this.FavMovies.push(movie);
          }
        });
      });
      this.snackBar.open(
        `${title} has been removed from your favorites!`,
        'OK',
        {
          duration: 4000,
        }
      );

    })

  }

  deleteUser(): void {
    this.fetchApiData.deleteUserProfile().subscribe(() => {
      this.snackBar.open(`has been removed!`, 'OK', {
        duration: 4000,
      });
      localStorage.clear();
    });
    this.router.navigate(['welcome']);
  }


  openEditProfileFormDialog(): void {
    this.dialog.open(EditProfileFormComponent, {
      width: '280px',
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
   * open a dialog to display the SummaryCardComponent
   * @param title {string}
   * @param description {string}
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SummaryCardComponent, {
      data: { title: title, description: description },
      width: '300px',
    });
  }
}
