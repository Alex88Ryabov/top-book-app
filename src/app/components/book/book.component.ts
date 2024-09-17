import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardHeader, MatCardImage } from '@angular/material/card';
import { BrokenImageLinkDirective } from '../../directives/broken-image-link.directive';
import { NgOptimizedImage } from '@angular/common';
import { Book } from '../../interfaces/book.interface';

@Component({
	selector: 'app-book',
	standalone: true,
	imports: [MatButton, MatCard, MatCardHeader, MatCardActions, MatCardImage, BrokenImageLinkDirective, NgOptimizedImage],
	templateUrl: './book.component.html',
	styleUrl: './book.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookComponent {
	public book: InputSignal<Book> = input.required<Book>();
  public defaultImage = '/assets/icons/svg/no-photo.svg'
}
