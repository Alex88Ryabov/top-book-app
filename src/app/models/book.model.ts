import { Book } from '../interfaces/book.interface';

export class BookModel implements Book {
	author = '';
	coverImage = '';
	description = '';
	title = '';
	year = null;
}
