import { Component, forwardRef, Input, signal } from '@angular/core';
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
})
export class ImagePickerComponent implements ControlValueAccessor {
	@Input() imageWidth: string = '100%'; // Ширина изображения
	@Input() imageHeight: string = 'auto'; // Высота изображения

	public previewUrl = signal<string>(''); // Сигнал для превью изображения
	public isImagePresent = signal<boolean>(true); // Сигнал для проверки наличия изображения

	private onChange: (value: any) => void = () => {};
	private onTouched: () => void = () => {};
	private isDisabled: boolean = false;

	// Обновление значения изображения
	private updateImage(value: string | null): void {
		this.previewUrl.set(value || '');
		this.isImagePresent.set(!!value);
		this.onChange(value || ''); // Уведомляем форму об изменении
	}

	// Обработчик выбора файла
	public onFileSelected(event: any): void {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => this.updateImage(reader.result as string);
			reader.readAsDataURL(file);
		}
	}

	public removeImage(): void {
		this.updateImage(null);
	}

	// ControlValueAccessor methods
	public writeValue(value: string): void {
		this.updateImage(value);
	}

	public registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	public setDisabledState(isDisabled: boolean): void {
		this.isDisabled = isDisabled;
	}
}
