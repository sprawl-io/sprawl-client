import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Router, RouterOutlet } from '@angular/router';
import { routerTransition } from './router.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routerTransition],
})
export class AppComponent {
  title = 'sprawl-client';
  version = 'sprawl alpha build v0.0.1a';
  private previousPath = '';

  constructor(private userService: UserService, private router: Router) {}

  isLoggedIn = () => this.userService.isLoggedIn();
  currentRoute = () => this.router.url;
  getPageTransition(routerOutlet: RouterOutlet) {
    if (routerOutlet.isActivated) {
      let transitionName = 'section';

      const { path } = routerOutlet.activatedRoute.routeConfig;
      const isSame = this.previousPath === path;
      const isBackward = this.previousPath.startsWith(path);
      const isForward = path.startsWith(this.previousPath);
      const isLogin = path === '/login';
      const isLogout = path === '/logout';
      const isMain = path === '/main';

      if (isSame) {
        transitionName = 'none';
      } else if (isLogin) {
        transitionName = 'forward';
      } else if (isLogout) {
        transitionName = 'backward';
      } else if (isMain) {
        transitionName = 'forward';
      } else if (isBackward && isForward) {
        transitionName = 'initial';
      } else if (isBackward) {
        transitionName = 'backward';
      } else if (isForward) {
        transitionName = 'forward';
      }

      if (transitionName === 'none') {
        transitionName = 'forward';
      }

      this.previousPath = path;

      return transitionName;
    }
  }

}
