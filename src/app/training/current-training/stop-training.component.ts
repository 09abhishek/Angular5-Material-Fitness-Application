import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
    selector: 'app-stop-training',
    template: `<h1 mat-dialog-title> Are you Sure! Don't Give Up!</h1>
    <mat-dialog-content>
        <p>You already completed {{ passedData.progress }} %</p>
    </mat-dialog-content>

    <mat-dialog-actions>
        <button mat-button [mat-dialog-close]="true">
            <mat-icon>done</mat-icon>
            Yes, Stop it!
        </button>

        <button mat-button [mat-dialog-close]="false">
            <mat-icon>clear</mat-icon>
            No, I give up!
        </button>
    </mat-dialog-actions>

    `
})

export class StopTrainingComponent {

    constructor(@Inject(MAT_DIALOG_DATA) private passedData: any) {
    }
}
