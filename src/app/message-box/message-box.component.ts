import { Component, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-message-box',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './message-box.component.html',
  styleUrl: './message-box.component.scss',
})
export class MessageBoxComponent {
  constructor(
    public dialogRef: MatDialogRef<MessageBoxComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      content: string;
      onClose?: () => void;  // Make onClose optional
    }
  ) {}

  closeMessageBox(): void {
    if (this.data.onClose && typeof this.data.onClose === 'function') {
      this.data.onClose();  // Safely call onClose if it's defined
    }
    this.dialogRef.close();  // Always close the dialog
  }
}
