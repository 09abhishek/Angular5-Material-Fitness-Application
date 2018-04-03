import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { TrainingComponent } from './training/training.component';
import { AuthGaurd } from './auth/auth.gaurd';


const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'training', component: TrainingComponent, canActivate: [AuthGaurd]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGaurd]

})
export class AppRoutingModule {

}