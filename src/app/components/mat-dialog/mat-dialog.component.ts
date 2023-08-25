import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.css']
})
export class MatDialogComponent {
  paymentAmount: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.paymentAmount = data.paymentAmount;
  }
}