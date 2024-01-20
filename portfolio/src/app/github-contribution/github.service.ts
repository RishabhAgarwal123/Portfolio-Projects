// github.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private http: HttpClient) {}

//   https://github-contributions-api.jogruber.de/v4/GITHUB_USERNAME?y=2020
// https://github-contributions-api.jogruber.de/v4/GITHUB_USERNAME?y=2016&y=2017
// https://github-contributions-api.jogruber.de/v4/GITHUB_USERNAME?y=last
// https://github-contributions-api.jogruber.de/v4/GITHUB_USERNAME?y=all # default

  getContributions(username: string) {
    const apiUrl = `https://github-contributions-api.jogruber.de/v4/${username}?y=2024`;
    return this.http.get(apiUrl);
  }
}
