import { Component, computed, Inject, OnInit, Signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { Book } from '../../interfaces/book.interface';
import { MatButton, MatIconButton } from '@angular/material/button';
import { BookService } from '../../services/book.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { filter } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ImagePickerComponent } from '../image-picker/image-picker.component';
import { TypedForm } from '../../types/typed-form.type';
import { BookFormType } from '../../types/book-form.type';
import { Nullable } from '../../types/nullable.type';

@Component({
	selector: 'app-book-detail-popup',
	standalone: true,
	templateUrl: './book-detail-popup.component.html',
	styleUrls: ['./book-detail-popup.component.scss'],
	imports: [
		MatDialogContent,
		MatDialogActions,
		MatButton,
		MatDialogTitle,
		MatDialogClose,
		MatIconButton,
		MatIconModule,
		MatHint,
		FormsModule,
		MatFormField,
		MatInput,
		CdkTextareaAutosize,
		MatLabel,
		ImagePickerComponent,
		ReactiveFormsModule,
	],
})
export class BookDetailPopupComponent implements OnInit {
	public isEditMode: Signal<boolean> = computed(() => this.bookService.editMode());
	public bookForm!: FormGroup<TypedForm<BookFormType>>;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: Book,
		private dialog: MatDialog,
		private bookService: BookService,
	) {}

	public ngOnInit(): void {
		this.attachForm();
	}

	private attachForm(): void {
		this.bookForm = new FormGroup<TypedForm<BookFormType>>({
			title: new FormControl<string>(this.data.title || '', [Validators.required, Validators.minLength(3)]),
			author: new FormControl<string>(this.data.author || '', [Validators.required, Validators.minLength(2)]),
			year: new FormControl<Nullable<number>>(this.data.year, [Validators.required, Validators.min(4)]),
			description: new FormControl<string>(this.data.description || ''),
			coverImage: new FormControl<string>(this.data.coverImage || ''),
		});
	}

	private get formControl(): TypedForm<BookFormType> {
		return this.bookForm.controls;
	}

	private mapFormData(): void {
		this.data.title = this.bookForm.controls.title!.value!;
		this.data.author = this.formControl.author!.value!;
		this.data.year = this.formControl.year!.value!;
		this.data.description = this.formControl.description!.value!;
		this.data.coverImage = this.formControl.coverImage!.value || '';
	}

	public delete(): void {
		this.dialog
			.open(DeleteDialogComponent)
			.afterClosed()
			.pipe(filter(Boolean))
			.subscribe(() => {
				this.bookService.deleteBook(this.data.id!);
				this.dialog.closeAll();
			});
	}

	public addOrUpdate(): void {
		this.mapFormData();
		this.data.id ? this.update() : this.add();
		this.dialog.closeAll();
	}

	private update(): void {
		this.bookService.updateBook(this.data);
	}

	private add(): void {
		this.bookService.addBook(this.data);
	}

	public enableEditMode(): void {
		this.bookService.editMode() ? this.bookService.editMode.set(false) : this.bookService.editMode.set(true);
	}

	public get enableEditModeTitle(): string {
		return this.isEditMode() ? 'Disable Edit Mode' : 'Enable Edit Mode';
	}
}
