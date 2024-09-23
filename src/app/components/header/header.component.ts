import {ChangeDetectionStrategy, Component, signal, WritableSignal} from '@angular/core';
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
import { BookManipulationModalComponent } from '../book-manipulation-modal/book-manipulation-modal.component';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
	public isExpanded: WritableSignal<boolean> = signal<boolean>(false);

	constructor(
		private bookService: BookService,
		private dialog: MatDialog,
	) {}

	public toggleSearch(): void {
		this.isExpanded.update((isExpanded) => !isExpanded);
	}

	public onInput(event: Event): void {
		const searchPhrase = (event.target as HTMLInputElement).value;

		this.bookService.searchPhrase.set(searchPhrase);
	}

	public addBook(event: Event): void {
		event.stopPropagation();
		this.dialog.open(BookManipulationModalComponent, {
			data: { ...new BookModel(), editMode: true },
			autoFocus: false,
			width: '90vw',
			maxHeight: '90vh',
		});
	}
}
