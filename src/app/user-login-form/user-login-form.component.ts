import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatLabel } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss',
  standalone: true,
  imports: [FormsModule, MatLabel, MatFormFieldModule, MatCardModule, MatInputModule],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { userName: '', password: '' };
  /**
   * Emits an event when the user clicks the login.
   * @type {EventEmitter<Login>}
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}
  logInUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (res) => {
        this.dialogRef.close();
        this.snackBar.open(`Login success, Welcom ${res.user.username}`, 'OK', {
          duration: 2000,
        });
        let user = {
          ...res.user,
          id: res.user._id,
          password: this.userData.password,
          token: res.token,
        };
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['movies']);
      },
      (res) => {
        this.snackBar.open('Login fail', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
