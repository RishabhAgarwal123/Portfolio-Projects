import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private webRequestService: WebRequestService, private router: Router) { }

  login(email: string, password: string) {
    this.webRequestService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // Auth tokens in header of this response
        this.setSession(res.body._id, res.headers.get('x-access-token') || '', res.headers.get('x-refresh-token') || '');
      })
    );
  }

  logout() {
    this.removeSession();
  }

  private setSession(userId: string, accessToken: string, refeshToken: string) {
    localStorage.setItem('id', userId);
    localStorage.setItem('access-token', accessToken);
    localStorage.setItem('refresh-token', refeshToken);
  }

  private removeSession() {
    localStorage.removeItem('id');
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
  }
}
