import {Directive, ElementRef, input, Input, InputSignal} from '@angular/core';

@Directive({
	selector: 'img[appImgDefault]',
	standalone: true,
	host: {
		'(error)': 'updateUrl()',
	},
})
export class BrokenImageLinkDirective {
	public appImgDefault: InputSignal<string> = input<string>('');

	constructor(private el: ElementRef<HTMLImageElement>) {}

	public updateUrl(): void {
		this.el.nativeElement.src = this.appImgDefault() || '/assets/images/svg/no-photos.svg';
	}
}
