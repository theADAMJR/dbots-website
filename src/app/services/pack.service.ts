import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PackService {
  endpoint = `${environment.endpoint}/packs`;

  private get key() {
    return localStorage.getItem('key');
  }

  private _packs = [];
  get packs() {
    return this._packs;
  }

  private get headers() {
    return { headers: { Authorization: this.key } };
  }

  constructor(private http: HttpClient) {}

  async init() {
    if (this.packs.length <= 0)
      this._packs = await this.http.get(this.endpoint).toPromise() as any;
  }

  get(id: string) {
    return this.packs.find(p => p._id === id);
  }

  create(value: any) {
    return this.http.post(this.endpoint, value, this.headers);
  }
  update(id: string, value: any) {
    return this.http.patch(`${this.endpoint}/${id}`, value, this.headers);
  }
  delete(id: string) {
    return this.http.delete(`${this.endpoint}/${id}`, this.headers);
  }
  vote(id: string) {
    return this.http.get(`${this.endpoint}/${id}/vote`, this.headers);
  }
}
