import { Injectable, signal, WritableSignal } from '@angular/core';
import { Book } from '../interfaces/book.interface';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { booksMockArray } from '../models/books-mock';

@Injectable({
	providedIn: 'root',
})
export class BookService {
	public editMode: WritableSignal<boolean> = signal<boolean>(false);
	public booksUpdated$: BehaviorSubject<boolean> = new BehaviorSubject(false);
	public searchPhrase$: BehaviorSubject<string> = new BehaviorSubject('');
	public currentMaxBookId: number = 0;
	private books: Book[] = booksMockArray;

	public getBooks(): Observable<Book[]> {
		return of(this.books)!.pipe(tap((books) => (this.currentMaxBookId = Math.max(...books.map((book) => book.id!)))));
	}

	public getBookById(id: number): Observable<Book> {
		return of(this.books.find((book) => book.id === id)!);
	}

	public addBook(book: Book): void {
		this.books.push({ ...book, id: this.currentMaxBookId + 1 });
		this.booksUpdated$.next(true);
	}

	public getBooks$(searchPhrase: string): Observable<Book[]> {
		return searchPhrase ? this.searchBooks(searchPhrase) : this.getBooks();
	}

	public updateBook(updatedBook: Book): void {
		const index = this.books.findIndex((book) => book.id === updatedBook.id);
		if (index !== -1) {
			this.books[index] = updatedBook;
			this.booksUpdated$.next(true);
		}
	}

	public deleteBook(id: number): void {
		const candidateToDelete = this.books.findIndex((book) => book.id === id);
		this.books.splice(candidateToDelete, 1);
	}

	public searchBooks(searchTerm: string): Observable<Book[]> {
		const lowerCaseTerm = searchTerm.toLowerCase();
		const filteredBooks = this.books.filter(
			(book) =>
				book.title.toLowerCase().includes(lowerCaseTerm) || book.author.toLowerCase().includes(lowerCaseTerm) || book.year?.toString().toLowerCase().includes(lowerCaseTerm),
		);
		return of(filteredBooks);
	}
}
