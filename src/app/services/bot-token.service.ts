import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BotTokenService {
  endpoint = environment.endpoint + '/bots';

  constructor(private http: HttpClient) {}
  
  private get key() {
    return localStorage.getItem('key');
  }
  private get headers() {
    return { headers: { Authorization: this.key } };
  }

  getToken(id: string) {
    return this.http.get(`${this.endpoint}/${id}/token`, this.headers).toPromise() as Promise<any>;
  }

  regenToken(id: string) {
    return this.http.get(`${this.endpoint}/${id}/token/regen`, this.headers).toPromise() as Promise<any>;
  }
}
