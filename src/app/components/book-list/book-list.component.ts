import { ChangeDetectionStrategy, Component, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { BookComponent } from '../book/book.component';
import { BookService } from '../../services/book.service';
import { Book } from '../../interfaces/book.interface';

@Component({
	selector: 'app-book-list',
	templateUrl: './book-list.component.html',
	styleUrls: ['./book-list.component.scss'],
	standalone: true,
	imports: [FormsModule, AsyncPipe, BookComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListComponent {
	public books: WritableSignal<Signal<Book[]>> = signal(this.bookService.books);

	constructor(private bookService: BookService) {}
}
