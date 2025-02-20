import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-quote-form-dialog',
  templateUrl: './quote-form-dialog.component.html',
  styleUrls: ['./quote-form-dialog.component.css']
})
export class QuoteFormDialogComponent {
  imgSrc: string | undefined;
  imgTitle: string | undefined;
  imgTitleURL: string | undefined;
  imgPhotographer: string | undefined;
  imgPhotographerURL: string | undefined;
  attribution: string | undefined;
  showAttribution: boolean | undefined;
  color: string | undefined;
  border: string | 'solid';
  headline: string | undefined;
  headlinePrefix: string | undefined;
  headlineBody: string | undefined;
  headlineSuffix: string | undefined;
  quoteText: string | undefined;
  author: string | undefined;
  isDark: boolean | undefined;
  isLandscape: boolean | undefined;
  fancyInt: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    // image info
    this.imgSrc = data.imgSrc;
    this.imgTitle = data.imgTitle;
    this.imgTitleURL = data.imgTitleURL;
    this.imgPhotographer = data.imgPhotographer;
    this.imgPhotographerURL = data.imgPhotographerURL;

    // test info
    this.color = data.color;
    this.border = data.border;
    this.headline = data.headline.trim();
    this.quoteText = data.quoteText;
    this.author = data.author ? `- ${data.author.trim()} -` : "";
    this.isDark = true;
    this.fancyInt = 0;
    
    this.setHeadline();
  }

  toggleMode() {
    this.isDark = !this.isDark;
  }
 
  toggleFancy() {
    this.fancyInt = (this.fancyInt+1) % 3;
    this.setHeadline();
  }

  toggleAttribution() {
    this.showAttribution = !this.showAttribution;

    if(this.showAttribution) {
      if(!this.imgTitle || !this.imgPhotographer)
        this.attribution = "";
      else {
        let titleLink = `<a href="${this.imgTitleURL}" target="_blank">${this.imgTitle}</a>`;
        let photographerLink = `<a href="${this.imgPhotographerURL}" target="_blank">${this.imgPhotographer}</a>`;
        this.attribution = `${titleLink} by ${photographerLink}`;
      }
    }
    else {
      this.attribution = "";
    }
  }

  createPNG() {
    // Get the preview dialog
    let display = document.getElementById('motivCanvas');
    if (!display) return;

    // create a canvas (screenshot)
    html2canvas(display, { useCORS: true }).then(function (canvas) {
      let link = document.getElementById('link');
      if (!link) return;

      // convert the canvas to a png and create a download link
      link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
      link.click();
    });
  }

  /**
   * Sets the headline to be no underline, full underline, or dropcapped with middle underlined.
   */
  private setHeadline() {
    let text = this.headline ?? "";
    this.isLandscape = window.screen.availHeight <= window.screen.availWidth;

    switch(this.fancyInt) {
      // No underline
      case 0:
      // Underlined
      case 1:
        this.headlinePrefix = "";
        this.headlineBody = text;
        this.headlineSuffix = "";
        break;
      // Dropcapped first and last character
      default:
        let indexEnd = text.length-1;
        this.headlinePrefix = text.substring(0,1);
        this.headlineBody = text.substring(1, indexEnd);
        this.headlineSuffix = text.substring(indexEnd);
    }
  }
}
