// src/app/user-registration-form/user-login-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component responsible for user login functionality.
 *
 * This component provides a form for users to log into the application, sends the input data
 * to the backend, handles success and failure responses, and navigates the user to the movie list
 * upon successful login.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  /**
   * Object containing the user's login credentials.
   *
   * - `Username`: The username entered by the user.
   * - `Password`: The password entered by the user.
   */
  @Input() userData = { Username: '', Password: '' };

  /**
   * Creates an instance of the UserLoginFormComponent.
   *
   * @param fetchApiData - Service for making API calls to the backend.
   * @param dialogRef - Reference to the dialog opened for the login form.
   * @param snackBar - Service for displaying notifications to the user.
   * @param router - Service for navigating between routes.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
  /**
   * Logs the user into the application.
   *
   * This function sends the user's login credentials to the backend API. On a successful login:
   * - Closes the login dialog.
   * - Displays a success notification to the user.
   * - Navigates the user to the "movies" route.
   *
   * If the login fails:
   * - Displays an error notification to the user.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        // Logic for a successful user registration goes here! (To be implemented)
        this.dialogRef.close(); // This will close the modal on success!
        this.snackBar.open('User login successfully!', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['movies']);
      },
      (result) => {
        this.snackBar.open(
          'Login failed! Please check your input or register first.',
          'OK',
          {
            duration: 2000,
          }
        );
      }
    );
  }
}
