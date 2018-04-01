import { Component, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';

@Component({
    selector: 'app-current-training',
    templateUrl: './current-training.component.html',
    styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

    restart = false;
    progress = 0;
    timer: number;
    exerciseName: string;

    // Injecting mat-Dialog component here to use .open to display the dialogbox stop the service
    constructor(private dialog: MatDialog, private trainingService: TrainingService) {
    }

    ngOnInit() {
        this.startOrResume();
    }

    onStop() {
        clearInterval(this.timer);
        const dialogRef = this.dialog.open(StopTrainingComponent, {
            data: { progress: this.progress }
        });

        // dialogRef.afterClosed().subscribe((result) => {console.log(result)});

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.trainingService.cancelExercise(this.progress);
            }
            else {
                this.startOrResume();
            }
            // this.restart = true;
        });
    }

    onReset() {
        clearInterval(this.timer);
        this.progress = 0;
        this.restart = true;
    }

    onRestart() {
        this.startOrResume();
    }

    // step is basically what would be the duration to update the spinner.
    startOrResume() {
        const step = this.trainingService.getRunningExercise().duration / 100 * 1000;
        console.log(this.trainingService.getRunningExercise());
        this.exerciseName = this.trainingService.getRunningExercise().name;
        this.timer = setInterval(() => {
            this.progress = this.progress + 1;
            if (this.progress >= 100) {
                this.trainingService.completeExercise();
                clearInterval(this.timer);
            }
        }, step);
        this.restart = false;
    }

}
