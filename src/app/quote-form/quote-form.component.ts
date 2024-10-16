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
  borderStyles: string[];

  constructor(private dialogRef: MatDialog) {
    this.borderStyles = [
      'Solid',
      'Double',
      'Dashed',
      'Dotted',
      'Groove',
      'Ridge',
      'Inset',
      'Outset'
    ];
  }

  motivationalForm = new FormGroup({
    orientationSelect: new FormControl(
      window.screen.availHeight <= window.screen.availWidth ? "landscape" : "portrait", { nonNullable: true }),
    headline: new FormControl(null, { nonNullable: true }),
    border: new FormControl('Solid', { nonNullable: true }),
    color: new FormControl('#225544', { nonNullable: true }),
    quote: new FormControl(null, { nonNullable: true }),
    author: new FormControl(null, { nonNullable: true }),

    searchTerm: new FormControl('', { nonNullable: true })
  });

  onSubmit() {
    const client = createClient(this.clientKey);
    const query = this.motivationalForm.controls.searchTerm.value;
    let orientation = this.motivationalForm.controls.orientationSelect.value;

    // Validations for text fields
    if (!this.validateTextFields()) return;

    // make sure query exists
    if (!query) {
      this.warningText = `Please enter an image search term.`;
      return;
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

  imageUpload(event: any): void {
    let imageFile = event.target.files[0];
    let imageBlob = URL.createObjectURL(imageFile);

    // check filetype
    if (!imageFile.type.includes('image/')) {
      this.warningText = "Please upload an image file.";
      return;
    }

    if (imageBlob) {
      this.warningText = "";

      let image = new Image();
      image.src = imageBlob;
      image.onload = () => {
        // get image orientation
        let isLandscape = image.width >= image.height;

        this.openImageDialog(imageBlob, isLandscape);
      };
    }
    else {
      this.warningText = "Cannot read file. Please choose another image file.";
    }
  }

  searchImages(event: { target: any; srcElement: any; currentTarget: any; }) {
    var target = event.target || event.srcElement || event.currentTarget;
    var srcAttr = target.attributes['data-imageurl'];
    let isLandscape = this.motivationalForm.controls.orientationSelect.value === "landscape";

    this.openImageDialog(srcAttr.nodeValue, isLandscape);
  }

  openImageDialog(image: string, isLandscape: boolean) {
    this.dialogRef.open(QuoteFormDialogComponent, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      data: {
        isLandscape,
        imgSrc: image,
        color: this.motivationalForm.controls.color.value,
        border: this.motivationalForm.controls.border.value,
        headline: this.motivationalForm.controls.headline.value,
        quoteText: this.motivationalForm.controls.quote.value,
        author: this.motivationalForm.controls.author.value
      }
    });
  }

  validateTextFields() {
    let headline = this.motivationalForm.controls.headline.value;
    let quoteText = this.motivationalForm.controls.quote.value;
    if (!headline && !quoteText) {
      this.warningText = `Please enter a headline or motivational text.`;
      return false;
    }
    else {
      this.warningText = "";
      return true;
    }
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
