import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { LandingComponent } from './landing/landing.component';
import { MainComponent } from './main/main.component';
import { LoggedInGuardService } from './logged-in.guard.service';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [ LoggedInGuardService ],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'main/create',
    component: MainComponent,
    canActivate: [ LoggedInGuardService ]
  },
  {
    path: 'main/analytics',
    component: MainComponent,
    canActivate: [ LoggedInGuardService ]
  },
  { path: 'logout', component: LogoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
