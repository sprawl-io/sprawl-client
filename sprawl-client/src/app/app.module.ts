import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { LoggedInGuardService } from './logged-in.guard.service';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskComponent } from './tasks/task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    MainComponent,
    LoginComponent,
    LogoutComponent,
    TasksComponent,
    TaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [LoggedInGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
