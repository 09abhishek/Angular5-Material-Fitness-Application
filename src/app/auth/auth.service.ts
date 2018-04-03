import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';

@Injectable()
export class AuthService {

    constructor(private router: Router,
                private afauth: AngularFireAuth,
                private trainingService: TrainingService,
                private uiService: UIService,) {
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
        this.uiService.loadingStateChanged.next(true);
        this.afauth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            this.uiService.showSnackbar
            ('User Registered Successfully Redirecting to Training Page...', null, 3000);
            this.uiService.loadingStateChanged.next(false);
            console.log(result);
        }).catch(error => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar(error.message, null, 3000);
        });

    }

    login(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        this.trainingService.cancelSubscriptions();
        this.afauth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            console.log(result);
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar('LoggedIn Successfully!', null, 3000);
        }).catch(error => {
            console.log(error.message);
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar('Email or password Error', null, 3000);
        });
    }


    logout() {
        this.afauth.auth.signOut(); // default signout method from angularfirestore2
        this.uiService.showSnackbar('LoggedOut Successfully', null, 3000);
    }
}
