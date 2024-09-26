import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-quote-form-dialog',
  templateUrl: './quote-form-dialog.component.html',
  styleUrls: ['./quote-form-dialog.component.css']
})
export class QuoteFormDialogComponent {
  imgSrc: string | undefined;
  imgWidth: string | undefined;
  headline: string | undefined;
  color: string | undefined;
  quoteText: string | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.imgSrc = data.imgSrc;
    this.imgWidth = data.isLandscape ? '80%' : '30%';
    this.headline = data.headline;
    this.color = data.color;
    this.quoteText = data.quoteText;
  }
}
