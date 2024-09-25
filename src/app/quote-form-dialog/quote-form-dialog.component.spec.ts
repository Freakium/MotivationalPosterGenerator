import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteFormDialogComponent } from './quote-form-dialog.component';

describe('QuoteFormDialogComponent', () => {
  let component: QuoteFormDialogComponent;
  let fixture: ComponentFixture<QuoteFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuoteFormDialogComponent]
    });
    fixture = TestBed.createComponent(QuoteFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
