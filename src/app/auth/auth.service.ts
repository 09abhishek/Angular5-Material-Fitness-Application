import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';

@Injectable()
export class AuthService {

    constructor(private router: Router,
                private afauth: AngularFireAuth,
                private trainingService: TrainingService) {
    }

    // Event emitter(subject) for the authChange

    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    initAuthListener() {
        // the auth state is an observable which we can subscribe to.
        // it will emit an event whenever the auth state changes.
        this.afauth.authState.subscribe(user => {
            if (user) {
                this.authChange.next(true);
                this.router.navigate(['/training']);
                this.isAuthenticated = true;
            } else {
                this.trainingService.cancelSubscriptions();
                this.authChange.next(false);
                this.router.navigate(['/login']);
                this.isAuthenticated = false;
            }
        });
    }

    isAuth() {
        return this.isAuthenticated; // true or false based on authorized user.
    }

    registerUser(authData: AuthData) {
        this.afauth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            console.log(result);
        }).catch(error => console.log(error));

    }

    login(authData: AuthData) {
        this.trainingService.cancelSubscriptions();
        this.afauth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            console.log(result);
        }).catch(error => console.log(error));
    }

    logout() {
        this.afauth.auth.signOut(); // default signout method from angularfirestore2
    }

}
