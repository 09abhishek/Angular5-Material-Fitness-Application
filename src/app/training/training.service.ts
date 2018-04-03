import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs/Subject';

import { Exercise } from './exercise.model';
import { Subscription } from 'rxjs/Subscription';


@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();

    private availableExercises: Exercise[] = [];
    private runningExercise: Exercise;
    private fbSubs: Subscription [] = [];

    constructor(private db: AngularFirestore) {
    }

    // store the user selects for the exercise!


    // it will retrun a copy of array ... not affecting the original one.

    fetchAvailableExercises() {
       this.fbSubs.push( this.db
            .collection('availableExercises')
            .snapshotChanges()
            .map(docArray => {
                return docArray.map(doc => {
                    return {
                        id: doc.payload.doc.id,
                        name: doc.payload.doc.data().name,
                        duration: doc.payload.doc.data().duration,
                        calories: doc.payload.doc.data().calories
                    };
                });
            })
            .subscribe((exercises: Exercise[]) => {
                this.availableExercises = exercises;
                console.log(...exercises);
                this.exercisesChanged.next([...this.availableExercises]);

            }));
    }

    startExercise(selectedId: string) {
        // this.db.doc('availableExercise/' + selectedId).update({lastSelected: new Date()});


        this.runningExercise = this.availableExercises
            .find(elementfromavailableExercises =>
            elementfromavailableExercises.name === selectedId);

        this.exerciseChanged.next({ ...this.runningExercise });
        this.db.doc('availableExercises/' + this.runningExercise.id).update({ lastSelected: new Date() });
    }

    completeExercise() {
        this.addDataToDatabase({
            ...this.runningExercise,
            date: new Date(),
            state: 'completed'
        });

        this.runningExercise = null;
        this.exerciseChanged.next(null);

    }

    cancelExercise(progress: number) {
        this.addDataToDatabase({
            ...this.runningExercise,
            duration: this.runningExercise.duration * (progress / 100 ),
            calories: this.runningExercise.calories * (progress / 100 ),
            date: new Date(),
            state: 'cancelled'
        });

        this.runningExercise = null;
        this.exerciseChanged.next(null);

    }

    getRunningExercise() {

        return { ...this.runningExercise };
    }

    fetchCompletedOrCancelledExercises() {
        this.fbSubs.push(this.db
            .collection('finishedExercises')
            .valueChanges()
            .subscribe((exercises: Exercise[]) => {
                this.finishedExercisesChanged.next(exercises);
            }));
    }

    cancelSubscriptions(){
        this.fbSubs.forEach(subs => subs.unsubscribe());
    }

    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercises').add(exercise);
    }
}
