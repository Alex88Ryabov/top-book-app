import { Component, input, InputSignal } from '@angular/core';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardImage, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { BrokenImageLinkDirective } from '../../directives/broken-image-link.directive';
import { NgOptimizedImage } from '@angular/common';
import { Book } from '../../interfaces/book.interface';
import { MatIconModule } from '@angular/material/icon';
import { BookDetailPopupComponent } from '../book-detail-popup/book-detail-popup.component';
import { BookService } from '../../services/book.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { filter, tap } from 'rxjs';
import { MatLabel } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
	selector: 'app-book',
	standalone: true,
	imports: [
		MatCard,
		MatCardHeader,
		MatCardActions,
		MatCardImage,
		BrokenImageLinkDirective,
		NgOptimizedImage,
		MatIconModule,
		MatButton,
		NgOptimizedImage,
		MatCardContent,
		MatCardTitle,
		MatCardSubtitle,
		MatFabButton,
		MatLabel,
		MatTooltipModule,
	],
	templateUrl: './book.component.html',
	styleUrl: './book.component.scss',
})
export class BookComponent {
	public book: InputSignal<Book> = input.required<Book>();
	public defaultImage = '/assets/icons/svg/no-photo.svg';

	constructor(
		private readonly bookService: BookService,
		public dialog: MatDialog,
	) {}

	public openDetail(event: Event): void {
		event.stopPropagation();
		this.dialog.open(BookDetailPopupComponent, {
			data: this.book(),
			autoFocus: false,
			width: '90vw',
			maxHeight: '90vh',
		});
	}

	public editBook(event: Event): void {
		event.stopPropagation();
		this.bookService.editMode.set(true);
		this.dialog
			.open(BookDetailPopupComponent, {
				data: this.book(),
				autoFocus: false,
				width: '90vw',
				maxHeight: '90vh',
			})
			.afterClosed()
			.pipe(tap(() => this.bookService.editMode.set(false)))
			.subscribe();
	}

	public delete(event: Event): void {
		event.stopPropagation();
		this.dialog
			.open(DeleteDialogComponent, { data: this.book().title })
			.afterClosed()
			.pipe(filter(Boolean))
			.subscribe(() => this.bookService.deleteBook(this.book().id!));
	}
}
