import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private webRequestService: WebRequestService, private router: Router, private http: HttpClient) { }

  login(email: string, password: string) {
    return this.webRequestService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // Auth tokens in header of this response
        this.setSession(res.body.user._id, res.headers.get('x-access-token') || '', res.headers.get('x-refresh-token') || '');
      })
    );
  }

  logout() {
    this.removeSession();
    this.router.navigate(['/login']);
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  getUserId() {
    return localStorage.getItem('id');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken);
  }

  private setSession(userId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('id', userId);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  private removeSession() {
    localStorage.removeItem('id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
    localStorage.removeItem('listIdFromTask');
    localStorage.removeItem('activeItem');
    localStorage.removeItem('listId');
  }

  getNewAccessToken() {
    this.http.get(`${this.webRequestService.ROOT_URL}/users/me/access-token`, {
      headers: {
        'x-refresh-token': this.getRefreshToken() || '',
        '_id': this.getUserId() || ''
      }
    })
  }
}