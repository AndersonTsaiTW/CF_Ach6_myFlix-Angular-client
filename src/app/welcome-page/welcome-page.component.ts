// src\app\welcome-page\welcome-page.component.ts
import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * Component representing the welcome page of the application.
 *
 * This component serves as the landing page for the application, allowing users to
 * either register for a new account or log in to an existing one. It utilizes dialogs
 * for the registration and login forms.
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  /**
   * Creates an instance of the WelcomePageComponent.
   *
   * @param dialog - Service for opening dialogs.
   */
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}

  /**
   * Opens a dialog for user registration.
   *
   * This method opens the `UserRegistrationFormComponent` in a dialog
   * with a fixed width of 280px.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    });
  }

  /**
   * Opens a dialog for user login.
   *
   * This method opens the `UserLoginFormComponent` in a dialog
   * with a fixed width of 280px.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px',
    });
  }
}
