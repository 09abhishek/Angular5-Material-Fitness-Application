import { Component } from '@angular/core';


@Component({
    selector: 'app-stop-training',
    template: `<h1 mat-dialog-title> Are you Sure! Don't Give Up!</h1>
    <mat-dialog-actions>
        <button mat-button [mat-dialog-close]="true">
            <mat-icon>done</mat-icon>
            Yes, Stop it!
        </button>

        <button mat-button [mat-dialog-close]="false">
            <mat-icon>clear</mat-icon>
            No, Stop it!
        </button>
    </mat-dialog-actions>

    `
})

export class StopTrainingComponent {

}