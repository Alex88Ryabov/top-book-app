import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { Book } from '../../interfaces/book.interface';
import { MatButton } from '@angular/material/button';
import { BookService } from '../../services/book.service';

@Component({
	selector: 'app-book-detail-popup',
	standalone: true,
	templateUrl: './book-detail-popup.component.html',
	styleUrls: ['./book-detail-popup.component.scss'],
	imports: [MatDialogContent, MatDialogActions, MatButton, MatDialogTitle],
})
export class BookDetailPopupComponent {
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: Book,
		private dialog: MatDialog,
		private bookService: BookService,
	) {}

	public close(): void {
		this.dialog.closeAll();
	}

	public delete(): void {
		if (this.data.id) {
			this.bookService.deleteBook(this.data.id);
		}
		this.dialog.closeAll();
	}

	public edit(): void {
		if (this.data.id) {
			this.bookService.deleteBook(this.data.id);
		}
		this.dialog.closeAll();
	}
}
