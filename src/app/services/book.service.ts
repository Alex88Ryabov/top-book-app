import { Injectable } from '@angular/core';
import { Book } from '../interfaces/book.interface';

@Injectable({
	providedIn: 'root',
})
export class BookService {
	private books: Book[] = [
		{
			id: 1,
			title: 'Book 1',
			author: 'Author 1',
			year: 2021,
			description: 'Description of Book 1',
			coverImage: '',
		},
		// {
		// 	id: 2,
		// 	title: 'Book 2',
		// 	author: 'Author 2',
		// 	year: 2020,
		// 	description: 'Description of Book 2',
		// 	coverImage: 'https://via.placeholder.com/150',
		// },
		// {
		// 	id: 3,
		// 	title: 'Book 3',
		// 	author: 'Author 3',
		// 	year: 2019,
		// 	description: 'Description of Book 3',
		// 	coverImage: 'https://via.placeholder.com/150',
		// },
		// {
		// 	id: 4,
		// 	title: 'Book 4',
		// 	author: 'Author 4',
		// 	year: 2014,
		// 	description: 'Description of Book 4',
		// 	coverImage: 'https://via.placeholder.com/150',
		// },
		// {
		// 	id: 5,
		// 	title: 'Book 5',
		// 	author: 'Author 5',
		// 	year: 2018,
		// 	description: 'Description of Book 5',
		// 	coverImage: 'https://via.placeholder.com/150',
		// },
	];

	public getBooks(): Book[] {
		return this.books;
	}

	public getBookById(id: number): Book | undefined {
		return this.books.find((book) => book.id === id);
	}

	public addBook(book: Book): void {
		this.books.push({ ...book, id: this.books.length + 1 });
	}

	public updateBook(updatedBook: Book): void {
		const index = this.books.findIndex((book) => book.id === updatedBook.id);
		if (index !== -1) {
			this.books[index] = updatedBook;
		}
	}

	public deleteBook(id: number): void {
    const candidateToDelete = this.books.findIndex(book => book.id === id);
    this.books.splice(candidateToDelete, 1);
  }
}
