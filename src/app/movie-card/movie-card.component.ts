import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageBoxComponent } from '../message-box/message-box.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe(
      (res) => {
        this.movies = res;

        let user = JSON.parse(localStorage.getItem('user') || '');
        this.movies.forEach((movie: any) => {
          movie.isFavorite = user.FavoriteMovies?.includes(movie._id);
        });
        return this.movies;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.removeItem('user');
  }

  redirectProfile(): void {
    this.router.navigate(['profile']);
  }

  modifyFavoriteMovies(movie: any): void {
    let user = JSON.parse(localStorage.getItem('user') || '');
    let icon = document.getElementById(`${movie._id}-favorite-icon`);

    // Ensure FavoriteMovies is initialized
    if (!user.FavoriteMovies) {
      user.FavoriteMovies = [];
    }

    if (user.FavoriteMovies.includes(movie._id)) {
      this.fetchApiData.deleteFavoriteMovie(user.id, movie.title).subscribe(
        (res) => {
          icon?.setAttribute('fontIcon', 'favorite_border');

          console.log('del success');
          console.log(res);
          user.FavoriteMovies = res.FavoriteMovies;
          localStorage.setItem('user', JSON.stringify(user));
        },
        (err) => {
          console.error(err);
        }
      );
    } else {
      icon?.setAttribute('fontIcon', 'favorite');
      user.FavoriteMovies.push(movie._id);

       //Uncomment this after debugging addFavoriteMovie API
       this.fetchApiData.addFavoriteMovie(user.id, movie._id).subscribe(res => {
          icon?.setAttribute("fontIcon", "favorite");
         console.log("add success");
          console.log(res);
          user.FavoriteMovies = res.FavoriteMovies;
          localStorage.setItem("user", JSON.stringify(user));
       }, err => {
          console.error(err);
       })
    }

    localStorage.setItem('user', JSON.stringify(user));
  }

  showGenre(movie: any): void {
    this.dialog.open(MessageBoxComponent, {
      data: {
        title: String(movie.genre.type).toUpperCase(),
        content: movie.genre.description,
      },
      width: '400px',
    });
  }

  showDirector(movie: any): void {
    this.dialog.open(MessageBoxComponent, {
      data: {
        title: movie.director,
        content: movie.director,
        onClose: () => this.dialog.closeAll(),
      },
      width: '400px',
    });
  }

  showDetail(movie: any): void {
    this.dialog.open(MessageBoxComponent, {
      data: {
        title: movie.title,
        content: movie.description,
      },
      width: '400px',
    });
  }
}