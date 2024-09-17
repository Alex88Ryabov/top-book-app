import { Nullable } from '../types/nullable.type';

export interface Book {
	id?: number;
	title: string;
	author: string;
	year: Nullable<number>;
	description?: string;
	coverImage?: string;
}
