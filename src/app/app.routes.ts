import { Routes } from '@angular/router';
import {AddEditBookComponent} from "./components/add-edit-book/add-edit-book.component";
import {BookListComponent} from "./components/book-list/book-list.component";

export const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'add', component: AddEditBookComponent },
  { path: 'edit/:id', component: AddEditBookComponent }
];
