import {ChangeDetectionStrategy, Component} from '@angular/core';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';

@Component({
	selector: 'app-footer',
	standalone: true,
	imports: [MatToolbar, MatToolbarRow],
	templateUrl: './footer.component.html',
	styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {}
