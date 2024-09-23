import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookManipulationModalComponent } from './book-manipulation-modal.component';

describe('BookDetailPopupComponent', () => {
  let component: BookManipulationModalComponent;
  let fixture: ComponentFixture<BookManipulationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookManipulationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookManipulationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
