import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { createClient } from 'pexels';
import { QuoteFormDialogComponent } from '../quote-form-dialog/quote-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.css']
})
export class QuoteFormComponent {
  private clientKey = "M3mCPlqVebPtriAepk0o22IS4zza0VYV0Ajn5neHANNUZTNxTaciLZnN";
  imageList: any;
  warningText: any;

  constructor(private dialogRef: MatDialog) { }

  motivationalForm = new FormGroup({
    orientationSelect: new FormControl(
      window.screen.availHeight <= window.screen.availWidth ? "landscape" : "portrait", { nonNullable: true }),
    headline: new FormControl('', { nonNullable: true }),
    color: new FormControl('#225544', { nonNullable: true }),
    quote: new FormControl('', { nonNullable: true }),
    searchTerm: new FormControl('', { nonNullable: true }),
  });

  onSubmit() {
    const client = createClient(this.clientKey);
    const query = this.motivationalForm.controls.searchTerm.value;
    let orientation = this.motivationalForm.controls.orientationSelect.value;

    // Validations for text fields
    let headline = this.motivationalForm.controls.headline.value;
    let quoteText = this.motivationalForm.controls.quote.value;
    if (!headline && !quoteText) {
      this.warningText = `Please enter a headline or quote text.`;
      return;
    }
    // make sure query exists
    else if (!query) {
      this.warningText = `Please enter an image search term.`;
      return;
    }
    else {
      this.warningText = "";
    }

    // set orientation to landscape if none selected
    orientation = orientation ? orientation : "landscape";

    client.photos.search({ query, orientation, per_page: 18 })
      .then(data => {
        // save list if results
        this.imageList = data;

        console.log("Search Results:", data);
      });
  }

  onClick(event: { target: any; srcElement: any; currentTarget: any; }) {
    var target = event.target || event.srcElement || event.currentTarget;
    var srcAttr = target.attributes['data-imageurl'];

    this.dialogRef.open(QuoteFormDialogComponent, {
      width: '100vw',
      height: '100vh',
      maxWidth: '90vw',
      data: {
        imgSrc: srcAttr.nodeValue,
        isLandscape: this.motivationalForm.controls.orientationSelect.value === "landscape",
        headline: this.motivationalForm.controls.headline.value,
        color: this.motivationalForm.controls.color.value,
        quoteText: this.motivationalForm.controls.quote.value
      }
    });
  }

  async getPageResults(url: string) {
    let response = await fetch(url, {
      headers: {
        Authorization: this.clientKey
      },
      method: 'GET'
    });

    if (!response.ok) {
      this.warningText = "An error occurred while retrieving images. Please try again later.";
      console.error(response);
    }

    this.imageList = await response.json();
  }
}
