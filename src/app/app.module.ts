import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
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
      {path: 'quote-form', component: QuoteFormComponent},
      {path: '', redirectTo: '/quote-form', pathMatch: 'full'},
      {path: '**', component: PageNotFoundComponent}
    ]),
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
