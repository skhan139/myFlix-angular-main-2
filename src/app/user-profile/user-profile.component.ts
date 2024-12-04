import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInput,
    FormsModule,
  ],
})
export class UserProfileComponent implements OnInit {
  userData: any = {};
  favoriteMovies: any[] = [];
  constructor(public fetchApiData: FetchApiDataService, public router: Router) {
    this.userData = JSON.parse(localStorage.getItem('user') || '');
  }
  ngOnInit(): void {
    this.getUser();
  }
  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe(
      (res: any) => {
        this.userData = {
          ...res,
          id: res._id,
          password: this.userData.password,
          token: this.userData.token,
        };
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.getfavoriteMovies();
      },
      (err: any) => {
        console.error(err);
      }
    );
  }
  resetUser(): void {
    this.userData = JSON.parse(localStorage.getItem('user') || '');
  }
  backToMovie(): void {
    this.router.navigate(['movies']);
  }
  getfavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe(
      (res: any) => {
        console.log('movies', res, this.userData);
        this.favoriteMovies = res.filter((movie: any) => {
          return this.userData.favoritemovie.includes(movie._id);
        });
        console.log('test favoriteMovies', this.favoriteMovies);
      },
      (err: any) => {
        console.error(err);
      }
    );
  }
  getUser(): void {
    this.fetchApiData
      .getUserByID(this.userData.userName)
      .subscribe((res: any) => {
        console.log('test ', res);
        this.userData = {
          ...res,
          id: res._id,
          password: this.userData.password,
          token: this.userData.token,
        };
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.getfavoriteMovies();
      });
  }
  removeFromFavorite(movie: any): void {
    this.fetchApiData
      .deleteFavoriteMovie(this.userData.userName, movie._id)
      .subscribe(
        (res: any) => {
          this.userData.favoriteMovies = res.favoriteMovies;
          this.getfavoriteMovies();
        },
        (err: any) => {
          console.error(err);
        }
      );
  }

  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.removeItem('user');
  }

  home(): void {
    console.log('navigate to movies');
    this.router.navigate(['movies']);
  }
}