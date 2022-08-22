import { filter, map } from 'rxjs/operators';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationEnd,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import { NotifyService } from 'src/app/services/notify.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  redirectUrlKey = 'redirect_url';
  private previousUrl: string | undefined;
  private currentUrl: string | undefined;
  constructor(
    private authService: AuthService,
    private router: Router,
    private notifyService: NotifyService,
    private location: Location
  ) {}

  async canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return this.checkActivate(route, state);
  }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return this.checkActivate(route, state);
  }

  async checkActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const isAuthenticated = await this.authService.isAuthenticated();
    console.log(
      '🚀 ~ file: auth.guard.ts ~ line 46 ~ AuthGuard ~ isAuthenticated',
      isAuthenticated
    );
    if (isAuthenticated) {
      return true;
    } else {
      this.authService.logout();
      this.router.navigate(['/auth'], {
        queryParams: {
          redirect_url: state.url,
        },
      });
      return false;
    }
  }
}
