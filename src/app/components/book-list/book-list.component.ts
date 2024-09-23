import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { BookComponent } from '../book/book.component';
import { BookService } from '../../services/book.service';
import { Book } from '../../interfaces/book.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'app-book-list',
	templateUrl: './book-list.component.html',
	styleUrls: ['./book-list.component.scss'],
	standalone: true,
	imports: [FormsModule, AsyncPipe, BookComponent],
})
export class BookListComponent implements OnInit {
	private bookService: BookService = inject(BookService);
	public books$!: Observable<Book[]>;

	constructor(private destroyRef: DestroyRef) {}

	public ngOnInit(): void {
		this.getBooks();
	}

	private getBooks(): void {
		this.bookService.searchPhrase$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((searchPhrase) => {
			this.books$ = this.bookService.getBooks$(searchPhrase);
		});
	}
}
