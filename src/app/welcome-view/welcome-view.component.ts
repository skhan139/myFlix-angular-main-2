import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

/**
 * Component for displaying welcome view.
 * @component
 */
@Component({
  selector: 'app-welcome-view',
  templateUrl: './welcome-view.component.html',
  styleUrl: './welcome-view.component.scss',
})
export class WelcomeViewComponent implements OnInit {
  constructor(public dialog: MatDialog, private router: Router) {} // Inject Router
  ngOnInit(): void {}

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    });
  }

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px',
    });
  }
}
