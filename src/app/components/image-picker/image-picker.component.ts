import {ChangeDetectionStrategy, Component, forwardRef, Input, signal} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { BrokenImageLinkDirective } from '../../directives/broken-image-link.directive';

@Component({
	selector: 'app-image-picker',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, MatIcon, MatIconButton, MatIconModule, MatMiniFabButton, BrokenImageLinkDirective, NgOptimizedImage],
	templateUrl: './image-picker.component.html',
	styleUrls: ['./image-picker.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => ImagePickerComponent),
			multi: true,
		},
	],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagePickerComponent implements ControlValueAccessor {
	@Input() imageWidth: string = '100%';
	@Input() imageHeight: string = 'auto';

	public previewUrl = signal<string>('');
	public isImagePresent = signal<boolean>(true);

	private onChange: (value: string) => void = () => {};
	private onTouched: () => void = () => {};
	private isDisabled: boolean = false;

	private updateImage(value: string | null): void {
		this.previewUrl.set(value || '');
		this.isImagePresent.set(!!value);
		this.onChange(value || '');
	}

	public onFileSelected(event: any): void {
		const [file] = event.target.files;
    event.target.value = ''; // needed if we add the same file multiple times

		if (file) {
			const reader = new FileReader();
			reader.onload = () => this.updateImage(reader.result as string);
			reader.readAsDataURL(file);
		}
	}

	public removeImage(): void {
		this.updateImage(null);
	}

	public writeValue(value: string): void {
		this.updateImage(value);
	}

	public registerOnChange(fn: () => void): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	public setDisabledState(isDisabled: boolean): void {
		this.isDisabled = isDisabled;
	}
}
