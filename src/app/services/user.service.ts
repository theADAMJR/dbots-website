import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  endpoint = environment.endpoint + '/user';

  private _user: any;
  get user() { return this._user; }

  private _savedUser: any;
  get savedUser() { return this._savedUser; }

  get isAdmin() {
    return this.savedUser?.role === 'admin';
  }
  
  private get key() {
    return localStorage.getItem('key');
  }
  private get headers() {
    return { headers: { Authorization: this.key } };
  }

  constructor(private http: HttpClient) {}

  async init() {
    if (!this.user || !this.savedUser)
      await this.updateUser();
  }

  async updateUser() {
    if (!this.key) return;

    const { user, saved } = await this.http.get(`${this.endpoint}`, this.headers).toPromise() as any;
    this._user = user;
    this._savedUser = saved;
  }

  getUser(id: string) {
    return this.http.get(`${this.endpoint}/${id}`).toPromise();
  }
}

export interface XPCard {
  primary: string;
  secondary: string;
  tertiary: string;
  backgroundURL: string;
}
