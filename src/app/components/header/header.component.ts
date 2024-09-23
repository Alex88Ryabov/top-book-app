import { Component } from '@angular/core';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatButton, MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgClass, NgStyle } from '@angular/common';
import { BookService } from '../../services/book.service';
import { MatDialog } from '@angular/material/dialog';
import { BookManipulationModalComponent } from '../book-detail-popup/book-manipulation-modal.component';
import { tap } from 'rxjs';
import { BookModel } from '../../models/book.model';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [MatToolbar, MatButton, RouterLink, MatToolbarRow, MatFormField, MatInput, MatIcon, MatIconModule, MatLabel, MatIconButton, NgStyle, NgClass],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
	animations: [
		trigger('expandSearch', [
			state(
				'collapsed',
				style({
					display: 'none',
					width: '0',
				}),
			),
			state(
				'expanded',
				style({
					display: 'flex',
					width: '60%',
				}),
			),
			transition('collapsed <=> expanded', [animate('300ms ease-in-out')]),
		]),
	],
})
export class HeaderComponent {
	public isExpanded = false;

	constructor(
		private bookService: BookService,
		private dialog: MatDialog,
	) {}

	public toggleSearch(): void {
		this.isExpanded = !this.isExpanded;
	}

	public onInput(event: Event): void {
		const searchPhrase = (event.target as HTMLInputElement).value;

		this.bookService.searchPhrase$.next(searchPhrase);
	}

	public addBook(event: Event): void {
		event.stopPropagation();
		this.bookService.editMode.set(true);
		this.dialog
			.open(BookManipulationModalComponent, {
				data: new BookModel(),
				autoFocus: false,
				width: '90vw',
				maxHeight: '90vh',
			})
			.afterClosed()
			.pipe(tap(() => this.bookService.editMode.set(false)))
			.subscribe();
	}
}
