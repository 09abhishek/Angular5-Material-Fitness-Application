import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {


    exercises: Observable<any>;


    constructor(private trainingService: TrainingService,
                private db: AngularFirestore) {
    }

    ngOnInit() {
        this.db.collection('availableExercises')
            .snapshotChanges()
            .map(docArrary => {
                docArrary.map(doc => {
                    return {
                        id: doc.payload.doc.id,
                        ...doc.payload.doc.data()
                    };
                });
                })
            .subscribe(re => {
            for (const res of re) {
                console.log(res);
            }
        });
    }

    onStartTraining(form: NgForm) {
        this.trainingService.startExercise(form.value.exercise);
    }
}

