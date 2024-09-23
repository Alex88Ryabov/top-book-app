import { ChangeDetectionStrategy, Component, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { BookComponent } from '../book/book.component';
import { BookService } from '../../services/book.service';
import { Book } from '../../interfaces/book.interface';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'app-book-list',
	templateUrl: './book-list.component.html',
	styleUrls: ['./book-list.component.scss'],
	standalone: true,
	imports: [FormsModule, AsyncPipe, BookComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('bookAnimation', [
			transition(':enter', [style({ opacity: 0, transform: 'scale(0.8)' }), animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
			transition(':leave', [animate('300ms ease-in', style({ opacity: 0, transform: 'scale(0.8)' }))]),
		]),
	],
})
export class BookListComponent {
	public books: WritableSignal<Signal<Book[]>> = signal(this.bookService.books);

	constructor(private bookService: BookService) {}
}
