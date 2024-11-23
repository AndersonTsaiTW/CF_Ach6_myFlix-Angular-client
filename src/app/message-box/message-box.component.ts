// src\app\message-box\message-box.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * Component representing a message box dialog.
 *
 * This component is used to display messages or alerts in a dialog format.
 * It utilizes Angular Material's `MatDialog` for its dialog functionality.
 */
@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],
})
export class MessageBoxComponent {
  /**
   * Creates an instance of the MessageBoxComponent.
   *
   * @param dialogRef - Reference to the currently opened dialog.
   * @param data - The data passed to the dialog, containing the title and content of the message.
   */
  constructor(
    public dialogRef: MatDialogRef<MessageBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; content: string }
  ) {}

  /**
   * Closes the dialog.
   *
   * This method is used to programmatically close the message box dialog.
   */
  closeDialog(): void {
    this.dialogRef.close();
  }
}
