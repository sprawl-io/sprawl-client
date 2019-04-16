import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sprawl-client';
  version = 'sprawl alpha build v0.0.1a';

  constructor(private userService: UserService, private router: Router) {}

  isLoggedIn = () => this.userService.isLoggedIn();
  currentRoute = () => this.router.url;
}
