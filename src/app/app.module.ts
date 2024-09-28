import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { QuoteFormComponent } from './quote-form/quote-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { QuoteFormDialogComponent } from './quote-form-dialog/quote-form-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    QuoteFormComponent,
    PageNotFoundComponent,
    QuoteFormDialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: QuoteFormComponent},
      {path: '**', component: PageNotFoundComponent}
    ]),
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
