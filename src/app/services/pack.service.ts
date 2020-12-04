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
      await this.refreshPacks();
  }

  async refreshPacks() {
    this._packs = await this.http.get(this.endpoint).toPromise() as any;
  }

  fetch(id: string) {
    return this.http.get(`${this.endpoint}/${id}`).toPromise() as any;
  }

  get(id: string) {
    return this.packs.find(p => p._id === id);
  }
  getUserPacks(userId: string) {
    return this.packs.filter(p => p.owner === userId);
  }
  getTopPacks() {
    return this.packs.sort((a, b) => (a.votes > b.votes) ? 1 : -1);
  }

  create(value: any): Promise<any> {
    return this.http.post(this.endpoint, value, this.headers).toPromise();
  }
  update(id: string, value: any): Promise<any> {
    return this.http.patch(`${this.endpoint}/${id}`, value, this.headers).toPromise();
  }
  delete(id: string): Promise<any> {
    return this.http.delete(`${this.endpoint}/${id}`, this.headers).toPromise();
  }
  vote(id: string): Promise<any> {
    return this.http.get(`${this.endpoint}/${id}/vote`, this.headers).toPromise();
  }
}
