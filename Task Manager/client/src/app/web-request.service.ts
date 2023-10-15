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

  delete(uri: string) {
    return this.http.delete(`${this.ROOT_URL}${uri}`);
  }

  post<T>(uri: string, payload: Object): Observable<T> {
    return this.http.post<T>(`${this.ROOT_URL}${uri}`, payload);
  }

  patch(uri: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}${uri}`, payload);
  }
}
