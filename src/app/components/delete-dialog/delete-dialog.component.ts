import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
	selector: 'loyalty-w-adm-delete-dialog',
	templateUrl: './delete-dialog.component.html',
	styleUrls: ['./delete-dialog.component.scss'],
	imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButton],
	standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteDialogComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}
