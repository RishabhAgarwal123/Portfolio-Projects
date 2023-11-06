import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {
  readonly ROOT_URL !: string;

  constructor(private http: HttpClient) {
    this.ROOT_URL = `http://localhost:4000/api/v1`
   }

  get<T>(uri: string): Observable<T> {
    return this.http.get<T>(`${this.ROOT_URL}${uri}`);
  }

  delete<T>(uri: string) {
    return this.http.delete<T>(`${this.ROOT_URL}${uri}`);
  }

  post<T>(uri: string, payload: Object): Observable<T> {
    return this.http.post<T>(`${this.ROOT_URL}${uri}`, payload);
  }

  patch<T>(uri: string, payload: Object): Observable<T> {
    return this.http.patch<T>(`${this.ROOT_URL}${uri}`, payload);
  }

  login(email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/users/login`, {
      email,
      password
    }, { observe: 'response' })
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/users/register`, {
      name,
      email,
      password
    }, { observe: 'response'} )
  }
}
