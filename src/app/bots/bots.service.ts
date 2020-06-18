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

  constructor(private http: HttpClient) {}
  
  private get key() { return localStorage.getItem('key'); }

  // TODO: include good keywords for SEO
  tags: Tag[] = [
    { name: 'anime', icon: 'far fa-circle', description: 'A tag that needs a description with keywords.' },
    { name: 'apex-legends', icon: 'fas fa-gamepad', description: 'A tag that needs a description with keywords.' },
    { name: 'chat', icon: 'fas fa-comments', description: 'A tag that needs a description with keywords.' },
    { name: 'csgo', icon: 'fas fa-gamepad', description: 'A tag that needs a description with keywords.' },
    { name: 'customizable', icon: 'fas fa-cogs', description: 'A tag that needs a description with keywords.' },
    { name: 'economy', icon: 'fas fa-coins', description: 'A tag that needs a description with keywords.' },
    { name: 'fortnite', icon: 'fas fa-gamepad', description: 'A tag that needs a description with keywords.' },
    { name: 'fun', icon: 'fas fa-grin-tears', description: 'A tag that needs a description with keywords.' },
    { name: 'league-of-legends', icon: 'fas fa-gamepad', description: 'A tag that needs a description with keywords.' },
    { name: 'leveling', icon: 'fas fa-trophy', description: 'A tag that needs a description with keywords.' },
    { name: 'logging', icon: 'fas fa-tree', description: 'A tag that needs a description with keywords.' },
    { name: 'media', icon: 'fas fa-photo-video', description: 'A tag that needs a description with keywords.' },
    { name: 'meme', icon: 'fas fa-grin-tears', description: 'A tag that needs a description with keywords.' },
    { name: 'minecraft', icon: 'fas fa-gamepad', description: 'A tag that needs a description with keywords.' },
    { name: 'mixer', icon: 'fab fa-mixer', description: 'A tag that needs a description with keywords.' },
    { name: 'moderation', icon: 'fas fa-gavel', description: 'A tag that needs a description with keywords.' },
    { name: 'multipurpose', icon: 'fas fa-adjust', description: 'A tag that needs a description with keywords.' },
    { name: 'music', icon: 'fas fa-music', description: 'A tag that needs a description with keywords.' },
    { name: 'pokemon', icon: 'fas fa-gamepad', description: 'A tag that needs a description with keywords.' },
    { name: 'pugb', icon: 'fas fa-gamepad', description: 'A tag that needs a description with keywords.' },
    { name: 'reddit', icon: 'fab fa-reddit', description: 'A tag that needs a description with keywords.' },
    { name: 'roblox', icon: 'fas fa-gamepad', description: 'A tag that needs a description with keywords.' },
    { name: 'rocket-league', icon: 'fas fa-gamepad', description: 'A tag that needs a description with keywords.' },
    { name: 'roleplay', icon: 'fas fa-theater-masks', description: 'A tag that needs a description with keywords.' },
    { name: 'roles', icon: 'fas fa-at', description: 'A tag that needs a description with keywords.' },
    { name: 'runescape', icon: 'fas fa-gamepad', description: 'A tag that needs a description with keywords.' },
    { name: 'soundboard', icon: 'fas fa-volume-up', description: 'A tag that needs a description with keywords.' },
    { name: 'twitch', icon: 'fab fa-twitch', description: 'A tag that needs a description with keywords.' },
    { name: 'twitter', icon: 'fab fa-twitter', description: 'A tag that needs a description with keywords.' },
    { name: 'utility', icon: 'fas fa-cogs', description: 'A tag that needs a description with keywords.' },
    { name: 'valorant', icon: 'fas fa-gamepad', description: 'A tag that needs a description with keywords.' },
    { name: 'verification', icon: 'fa fa-check-circle', description: 'A tag that needs a description with keywords.' },
    { name: 'web-dashboard', icon: 'fas fa-cogs', description: 'A tag that needs a description with keywords.' },
    { name: 'youtube', icon: 'fab fa-youtube', description: 'A tag that needs a description with keywords.' }
  ]

  getTag(name: string) {
    return this.tags.find(t => t.name === name);
  }

  async init() {
    try {
      if (!this.bots || !this.savedBots)
        await this.updateBots();
      if (!this.userBots || !this.userSavedBots)
        await this.updateUserBots();
    } catch {}
  }

  async updateBots() {
    const bots = await this.http.get(`${this.endpoint}`).toPromise() as any;

    this._savedBots = bots.saved
      .filter(b => b.approvedAt)
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

  getTaggedBots(tagName: string) {
    const savedBots = this.savedBots.filter(b => b.listing.tags.some(n => n === tagName));
    const ids = savedBots.map(b => b._id);

    const bots = [];
    for (const id of ids)
      bots.push(this.bots.find(b => b.id === id));

    return { bots, saved: savedBots };
  }
  getNewBots() {
    const oneWeekAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7);
    const savedBots = this.savedBots
      .filter(b => b.approvedAt > oneWeekAgo);
    
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
    
    const saved = fuse
      .search(query)
      .map(r => r.item);    

    const ids = saved.map(b => b._id);
    const bots = this.bots
      .filter(b => ids.includes(b.id));    

    return { bots, saved };
  }

  createBot(value: any) {
    return this.http.post(`${this.endpoint}?key=${this.key}`, value).toPromise() as Promise<any>;
  }
  updateBot(id: string, value: any) {
    return this.http.put(`${this.endpoint}/${id}?key=${this.key}`, value).toPromise() as Promise<any>;
  }
}

export interface Tag {
  description: string;
  icon: string;
  name: string;
}
