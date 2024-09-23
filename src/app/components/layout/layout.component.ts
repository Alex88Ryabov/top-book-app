import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet, ɵEmptyOutletComponent } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
	selector: 'app-layout',
	standalone: true,
	imports: [HeaderComponent, RouterOutlet, FooterComponent, ɵEmptyOutletComponent],
	templateUrl: './layout.component.html',
	styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
