import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    isAuth = false;
    authSubscription: Subscription;
    // using Output() making this event emitter listenable from outside.

    @Output() sidenavToggle = new EventEmitter<void>();

    constructor(private authService: AuthService) {

    }

    ngOnInit() {
        this.authService.authChange
            .subscribe((authStatus) => {
                this.isAuth = authStatus;
            });
    }

    onToggleSideNav() {
        this.sidenavToggle.emit();
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy() {
        if (this.authSubscription) {
            this.authSubscription.unsubscribe();
        }
    }

}
