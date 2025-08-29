import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {
  data = inject<ConfirmationModalDataDto>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<ConfirmationModalComponent>);

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}

export interface ConfirmationModalDataDto {
  title: string;
  question: string;
}
