// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component responsible for user registration functionality.
 *
 * This component provides a form for users to register an account. It sends the input data
 * to the backend API and handles success and failure responses.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * Object containing the user's registration data.
   *
   * - `Username`: The username chosen by the user.
   * - `Password`: The password chosen by the user.
   * - `Email`: The user's email address.
   * - `Birthday`: The user's date of birth.
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Creates an instance of the UserRegistrationFormComponent.
   *
   * @param fetchApiData - Service for making API calls to the backend.
   * @param dialogRef - Reference to the dialog opened for the registration form.
   * @param snackBar - Service for displaying notifications to the user.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
  /**
   * Registers a new user with the provided registration data.
   *
   * This function sends the user's registration information to the backend API.
   * On successful registration:
   * - Closes the registration dialog.
   * - Displays a success notification using a Snackbar.
   *
   * On failure:
   * - Displays an error notification with the backend response.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        // Logic for a successful user registration goes here! (To be implemented)
        this.dialogRef.close(); // This will close the modal on success!
        this.snackBar.open('User registered successfully!', 'OK', {
          duration: 2000,
        });
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
