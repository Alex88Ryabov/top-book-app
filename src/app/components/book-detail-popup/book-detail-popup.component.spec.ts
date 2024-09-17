import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailPopupComponent } from './book-detail-popup.component';

describe('BookDetailPopupComponent', () => {
  let component: BookDetailPopupComponent;
  let fixture: ComponentFixture<BookDetailPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDetailPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
