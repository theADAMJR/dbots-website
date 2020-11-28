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

  getAPIDocument(id: string) {
    return this.http.get(`${this.endpoint}/${id}/api`, this.headers).toPromise() as Promise<any>;
  }

  regenToken(id: string) {
    return this.http.get(`${this.endpoint}/${id}/key/regen`, this.headers).toPromise() as Promise<any>;
  }

  testWebhook(url: string, data: any): Promise<any> {
    return this.http.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.key
      }
    }).toPromise() as Promise<any>;
  }
}
