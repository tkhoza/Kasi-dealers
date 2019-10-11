import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, tap, catchError } from 'rxjs/operators';
import * as moment from 'moment';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api_url = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  login(user: User) {
    if (user.email !== '' && user.password !== '') {
      // Verify if response is valid ???
      return this.http.post<User>(this.api_url + '/login', user)
        .pipe(
          tap(this.setSession),
          shareReplay()
        );
    }
  }

  register(user: User) {
    if (user.email !== '' && user.password !== '' && user.firstName !== '' && user.lastName !== '') {
      // Verify if response is valid ???
      return this.http.post<User>(this.api_url +'/createUser', user)
        .pipe(
          tap(this.setSession),
          shareReplay()
        );
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('token', authResult.token);
    //localStorage.setItem('user_id', authResult.user.id);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }
}
