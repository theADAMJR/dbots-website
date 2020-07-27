import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Fuse from 'fuse.js';

@Injectable({
  providedIn: 'root'
})
export class BotsService {
  endpoint = environment.endpoint + '/bots';
  
  private _bots: any[];
  get bots() { return this._bots; }
  
  private _savedBots: any[];
  get savedBots() { return this._savedBots; }

  private _userBots: any[];
  get userBots() { return this._userBots; }
  
  private _userSavedBots: any[];
  get userSavedBots() { return this._userSavedBots; }

  get unreviewedBots() {
    const savedBots = this.savedBots.filter(b => !b.approvedAt);
    const ids = savedBots.map(b => b._id);
    const bots = [];
    for (const id of ids)
      bots.push(this.bots.find(b => b.id === id));

    return { bots, saved: savedBots };
  }

  constructor(private http: HttpClient) {}
  
  private get key() { return localStorage.getItem('key'); }

  async init() {
    try {
      if (!this.bots || !this.savedBots)
        await this.refreshBots();
      if (!this.userBots || !this.userSavedBots)
        await this.updateUserBots();
    } catch {}
  }

  async refreshBots() {
    const bots = await this.http.get(`${this.endpoint}`).toPromise() as any;

    this._savedBots = bots.saved
      .sort((a, b) => b.votes.length - a.votes.length);    

    const ids = this.savedBots.map(b => b._id);
    this._bots = bots.users.filter(b => ids.includes(b.id));
  }
  async updateUserBots() {
    this._userBots = (this.key) ?
      await this.http.get(`${this.endpoint}/user?key=${this.key}`).toPromise() as any : null;

    this._userSavedBots = (this.key) ?
      await this.http.get(`${this.endpoint}/user/saved?key=${this.key}`).toPromise() as any : null;
  }
  getSavedLog(id: string) {
    return this.http.get(`${this.endpoint}/${id}/log?key=${this.key}`).toPromise() as Promise<any>;
  }

  getBot(id: string) {
    return this.bots.find(b => b.id === id);
  }
  getSavedBot(id: string) {
    return this.savedBots.find(b => b._id === id);
  }
  
  vote(id: string) {
    return this.http.get(`${this.endpoint}/${id}/vote?key=${this.key}`).toPromise() as Promise<any>;
  }

  getTopBots() {
    const savedBots = this.savedBots.filter(b => b.approvedAt);
    const ids = savedBots.map(b => b._id);
    const bots = [];
    for (const id of ids)
      bots.push(this.bots.find(b => b.id === id));

    return { bots, saved: savedBots };
  }
  getTaggedBots(tagName: string) {
    const savedBots = this.savedBots
      .filter(b => b.approvedAt &&
        b.listing?.tags
        .some(n => n === tagName));
    const ids = savedBots.map(b => b._id);

    const bots = [];
    for (const id of ids)
      bots.push(this.bots.find(b => b.id === id));

    return { bots, saved: savedBots };
  }
  getNewBots() {
    const oneWeekAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7);
    const savedBots = this.savedBots
      .filter(b => new Date(b.approvedAt) > oneWeekAgo); 
    
    const ids = savedBots.map(b => b._id);
    const bots = this.bots.filter(b => ids.includes(b.id));

    return { bots, saved: savedBots };
  }
  getFeaturedBots() {
    const savedBots = this.savedBots
      .filter(b => b.badges?.includes('featured'));
    
    const ids = savedBots.map(b => b._id);
    const bots = this.bots.filter(b => ids.includes(b.id));

    return { bots, saved: savedBots };
  }
  searchBots(query: string) {
    const fuse = new Fuse(this.savedBots, {
      includeScore: true,
      keys: [
        { name: 'listing.overview', weight: 1 },
        { name: 'listing.body', weight: 0.5 },
        { name: 'listing.tags', weight: 0.3 }
      ]
    });
    
    const savedBots = fuse
      .search(query)
      .map(r => r.item);    

    const ids = savedBots.map(b => b._id);
    const bots = this.bots
      .filter(b => ids.includes(b.id));    

    return { bots, saved: savedBots };
  }

  createBot(value: any) {
    return this.http.post(`${this.endpoint}?key=${this.key}`, value).toPromise() as Promise<any>;
  }
  updateBot(id: string, value: any) {
    return this.http.put(`${this.endpoint}/${id}?key=${this.key}`, value).toPromise() as Promise<any>;
  }
  async deleteBot(id: string) {
    await this.http.delete(`${this.endpoint}/${id}?key=${this.key}`).toPromise() as Promise<any>;
    await this.refreshBots();
  }

  async approveBot(id: string, reason: string) {
    await this.http.post(`${this.endpoint}/${id}/review?key=${this.key}`, {
      approved: true,
      reason
    } as Judgement).toPromise() as Promise<any>;
    
    await this.refreshBots();
  }
  async declineBot(id: string, reason: string) {
    await this.http.post(`${this.endpoint}/${id}/review?key=${this.key}`, {
      approved: false,
      reason
    } as Judgement).toPromise() as Promise<any>;
    
    await this.refreshBots();
  }
  addBadge(id: string, name: string) {
    return this.http.get(`${this.endpoint}/${id}/add-badge/${name}?key=${this.key}`).toPromise() as Promise<any>;
  }
}

export interface Judgement {
  approved: boolean;
  reason: string;
}