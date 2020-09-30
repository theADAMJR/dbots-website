import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Fuse from 'fuse.js';
import { UserService } from './user.service';

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
  
  private get key() {
    return localStorage.getItem('key');
  }
  private get headers() {
    return { headers: { Authorization: this.key } };
  }

  constructor(
    private http: HttpClient,
    private userService: UserService) {}  

  async init() {
    try {
      if (!this.bots || !this.savedBots)
        await this.refreshBots();
      if (!this.userBots || !this.userSavedBots)
        await this.updateUserBots();
    } catch {}
  }

  async refreshBots() {
    const { saved, users } = await this.http.get(`${this.endpoint}`).toPromise() as any;

    this._savedBots = saved
      .filter(sb => users.some(g => g.id === sb._id) || !sb.approvedAt)
      .sort((a, b) => b.votes.length - a.votes.length);    

    this._bots = users
      .filter(b => this.savedBots.some(sb => sb._id === b.id));
  }
  async updateUserBots() {
    await this.userService.init();

    this._userSavedBots = this.savedBots
      .filter(sb => sb.ownerId === this.userService.user.id);
    this._userBots = this.bots
      .filter(b => this.userSavedBots.some(sb => sb._id === b.id));
  }
  getSavedLog(id: string) {
    return this.http.get(`${this.endpoint}/${id}/log`, this.headers).toPromise() as Promise<any>;
  }

  getBot(id: string) {
    return this.bots.find(b => b.id === id);
  }
  getSavedBot(id: string) {
    return this.savedBots.find(b => b._id === id);
  }
  
  vote(id: string) {
    return this.http.get(`${this.endpoint}/${id}/vote`, this.headers).toPromise() as Promise<any>;
  }

  getTopBots() {
    return { bots: this.bots, saved: this.savedBots };
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
    const savedBots = this.shuffle(this.savedBots
      .filter(b => b.badges?.includes('featured')));
    
    const ids = savedBots.map(b => b._id);
    const bots = this.bots.filter(b => ids.includes(b.id));

    return { bots, saved: savedBots };
  }
  private shuffle(arr: any[]) {
    const newArr = arr.slice()
    for (let i = newArr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr;
  }
  searchBots(query: string) {
    const queryBots = this.savedBots
      .map(saved => {
        const bot = this.bots.find(g => g.id === saved._id);
        return {
          id: bot?.id,
          username: bot?.username,
          ownerId: bot.ownerId,
          listing: saved?.listing ?? {}
        };
      });

    const fuse = new Fuse(queryBots, {
      includeScore: true,
      isCaseSensitive: false,
      keys: [
        { name: 'id', weight: 3 },
        { name: 'username', weight: 1.5 },
        { name: 'listing.overview', weight: 0.6 },
        { name: 'listing.body', weight: 0.5 },
        { name: 'listing.tags', weight: 0.3 }
      ]
    });

    const searchBots = fuse
      .search(query)
      .map(r => r.item);

    const ids = searchBots.map(g => g.id);
    return {
      bots: this.bots.filter(g => ids.includes(g.id)),
      saved: this.savedBots.filter(g => ids.includes(g._id))
    };
  }

  createBot(value: any) {
    return this.http.post(`${this.endpoint}`, value, this.headers).toPromise() as Promise<any>;
  }
  updateBot(id: string, value: any) {
    return this.http.put(`${this.endpoint}/${id}`, value, this.headers).toPromise() as Promise<any>;
  }
  async deleteBot(id: string) {
    await this.http.delete(`${this.endpoint}/${id}`, this.headers).toPromise() as Promise<any>;
    await this.refreshBots();
  }

  async approveBot(id: string, reason: string) {
    await this.http.post(`${this.endpoint}/${id}/review`,
      { approved: true, reason } as Judgement, this.headers).toPromise() as Promise<any>;
    
    await this.refreshBots();
  }
  async declineBot(id: string, reason: string) {
    await this.http.post(`${this.endpoint}/${id}/review`, {
      approved: false,
      reason
    } as Judgement, this.headers).toPromise() as Promise<any>;
    
    await this.refreshBots();
  }
  addBadge(id: string, name: string) {
    return this.http.get(`${this.endpoint}/${id}/add-badge/${name}`, this.headers).toPromise() as Promise<any>;
  }

  getStats(id: string) {
    return this.http.get(`${this.endpoint}/${id}/stats`).toPromise() as Promise<any>;
  }
}

export interface Judgement {
  approved: boolean;
  reason: string;
}