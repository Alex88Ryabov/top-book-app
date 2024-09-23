import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Book } from '../interfaces/book.interface';
import { booksMockArray } from '../models/books-mock';

@Injectable({
	providedIn: 'root',
})
export class BookService {
	public books: Signal<Book[]> = computed(() => (this.searchPhrase() ? this.allBooks().filter((book) => this.searchBooks(book, this.searchPhrase())) : this.allBooks()));
	public searchPhrase: WritableSignal<string> = signal<string>('');
	private allBooks: WritableSignal<Book[]> = signal<Book[]>(booksMockArray);
	private incrementMaxBookId: Signal<number> = computed(() => Math.max(...this.allBooks().map((book) => book.id!)) + 1);

	public addBook(book: Book): void {
		this.allBooks.update((books) => [...books, { ...book, id: this.incrementMaxBookId() }]);
	}

	public updateBook(book: Book): void {
		this.allBooks.update((books) => books.map((b) => (b.id === book.id ? { ...b, ...book } : b)));
	}

	public deleteBook(id: number): void {
		this.allBooks.update((books) => books.filter((book) => book.id !== id));
	}

	public searchBooks(book: Book, searchTerm: string): boolean | undefined {
		const lowerCaseTerm = searchTerm.toLowerCase();
		const { title, author, year } = book;

		return title.toLowerCase().includes(lowerCaseTerm) || author.toLowerCase().includes(lowerCaseTerm) || year?.toString().toLowerCase().includes(lowerCaseTerm);
	}
}
