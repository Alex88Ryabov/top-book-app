import { ChangeDetectionStrategy, Component, Inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { Book } from '../../interfaces/book.interface';
import { MatButton, MatIconButton } from '@angular/material/button';
import { BookService } from '../../services/book.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { filter } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ImagePickerComponent } from '../image-picker/image-picker.component';
import { TypedForm } from '../../types/typed-form.type';
import { BookFormType } from '../../types/book-form.type';
import { Nullable } from '../../types/nullable.type';
import { BrokenImageLinkDirective } from '../../directives/broken-image-link.directive';

@Component({
	selector: 'app-book-manipulation-modal',
	standalone: true,
	templateUrl: './book-manipulation-modal.component.html',
	styleUrls: ['./book-manipulation-modal.component.scss'],
	imports: [
		MatDialogContent,
		MatDialogActions,
		MatButton,
		MatDialogTitle,
		MatDialogClose,
		MatIconButton,
		MatIconModule,
		FormsModule,
		MatFormField,
		MatInput,
		CdkTextareaAutosize,
		MatLabel,
		ImagePickerComponent,
		ReactiveFormsModule,
		BrokenImageLinkDirective,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookManipulationModalComponent implements OnInit {
	public editMode: WritableSignal<boolean> = signal<boolean>(this.data.editMode);
	public bookForm!: FormGroup<TypedForm<BookFormType>>;
	public defaultImage = '/assets/icons/svg/no-photo.svg';

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { editMode: boolean } & Book,
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
			year: new FormControl<Nullable<number>>(this.data.year, [Validators.required, Validators.max(4)]),
			description: new FormControl<string>(this.data.description || ''),
			coverImage: new FormControl<string>(this.data.coverImage || ''),
		});
	}

	private mapFormData(): void {
		const formValue = <Book>this.bookForm.value;
		this.data = { ...this.data, ...formValue };
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
		this.editMode() ? this.editMode.set(false) : this.editMode.set(true);
	}

	public get enableEditModeTitle(): string {
		return this.editMode() ? 'Disable Edit Mode' : 'Enable Edit Mode';
	}
}
