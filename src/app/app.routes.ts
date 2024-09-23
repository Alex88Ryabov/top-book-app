import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { BookListComponent } from './components/book-list/book-list.component';

export const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [{ path: '', loadComponent: () => BookListComponent }],
	},
];
