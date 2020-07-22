import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthService {
  endpoint = environment.endpoint;

  get key() { return localStorage.getItem('key'); }

  constructor(private http: HttpClient) {}

  validateKey() {
    const { isTokenExpired } = new JwtHelperService();
    try {      
      if (isTokenExpired(this.key))
        localStorage.removeItem('key');
    } catch {}
  }

  authenticate(code: string) {
    return this.http.get(`${this.endpoint}/auth?code=${code}`).toPromise() as Promise<string>;
  }
}
