import {Component, input, InputSignal, OnInit} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BookService } from '../../services/book.service';
import { TypedForm } from '../../types/typed-form.type';
import { BookFormType } from '../../types/book-form.type';
import {Nullable} from "../../types/nullable.type";

@Component({
	selector: 'app-add-edit-book',
	standalone: true,
	templateUrl: './add-edit-book.component.html',
	styleUrls: ['./add-edit-book.component.scss'],
	imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class AddEditBookComponent implements OnInit {
	public bookForm: FormGroup<TypedForm<BookFormType>> = new FormGroup<TypedForm<BookFormType>>({});
	public isEditMode = false;
  public id: InputSignal<number> = input<number>(0);

	constructor(
		private bookService: BookService
	) {}

	public ngOnInit(): void {
		if (!!this.id()) {
			this.isEditMode = true;
			const book = this.bookService.getBookById(this.id());
		}
		this.attachForm();
	}

	private attachForm(): void {
		this.bookForm = new FormGroup<TypedForm<BookFormType>>({
			author: new FormControl<string>('', Validators.required),
			description: new FormControl<string>(''),
			year: new FormControl<Nullable<number>>(null),
			title: new FormControl<string>(''),
			coverImage: new FormControl<string>(''),
		});
	}

	// save(): void {
	// 	if (this.bookForm.valid) {
	// 		if (this.isEditMode) {
	// 			this.bookService.updateBook({ ...this.bookForm.value, id: this.route.snapshot.paramMap.get('id')! });
	// 		} else {
	// 			this.bookService.addBook(this.bookForm.value);
	// 		}
	// 		this.router.navigate(['/']);
	// 	}
	// }
}
