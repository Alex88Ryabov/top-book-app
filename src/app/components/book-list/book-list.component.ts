import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BookService } from '../../services/book.service';
import { Book } from '../../interfaces/book.interface';
import { BookDetailPopupComponent } from '../book-detail-popup/book-detail-popup.component';
import {BookComponent} from "../book/book.component";

@Component({
	selector: 'app-book-list',
	standalone: true,
	templateUrl: './book-list.component.html',
	styleUrls: ['./book-list.component.scss'],
	imports: [MatCardModule, MatButtonModule, BookComponent],
})
export class BookListComponent implements OnInit {
	books: Book[] = [];

	constructor(
		private bookService: BookService,
		public dialog: MatDialog,
	) {}

	public ngOnInit(): void {
		this.books = this.bookService.getBooks();
	}

	public openDetail(book: Book): void {
		this.dialog.open(BookDetailPopupComponent, {
			data: book,
		});
	}

	public editBook(book: Book): void {
		// Implement edit functionality (e.g., navigate to edit form)
	}

	public deleteBook(book: Book): void {
    if (book.id) {
		  this.bookService.deleteBook(book.id);
    }
	}
}
