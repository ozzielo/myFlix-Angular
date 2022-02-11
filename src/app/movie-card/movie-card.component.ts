import { Component, OnInit } from '@angular/core';
import { GetAllMoviesService } from '../fetch-api-data.service';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SummaryCardComponent } from '../summary-card/summary-card.component';

import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  constructor(public fetchApiData: GetAllMoviesService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMovies();
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
}

