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
  // TODO: include good keywords for SEO
  tags: Tag[] = [
    { name: 'anime', icon: 'far fa-circle', description: 'Find the best anime Discord bots from our list of the best Discord bots.' },
    { name: 'apex-legends', icon: 'fas fa-gamepad', description: 'Find the best Apex Legends Discord bots from our list of the best Discord bots.' },
    { name: 'chat', icon: 'fas fa-comments', description: 'Find the best chat Discord bots from our list of the best Discord bots.' },
    { name: 'csgo', icon: 'fas fa-gamepad', description: 'Find the best CSGO Discord bots from our list of the best Discord bots.' },
    { name: 'customizable', icon: 'fas fa-cogs', description: 'Find the best customizable Discord bots from our list of the best Discord bots.' },
    { name: 'economy', icon: 'fas fa-coins', description: 'Find the best economy Discord bots from our list of the best Discord bots.' },
    { name: 'fortnite', icon: 'fas fa-gamepad', description: 'Find the best Fortnite Discord bots from our list of the best Discord bots.' },
    { name: 'fun', icon: 'fas fa-grin-tears', description: 'Find the most fun Discord bots from our list of the best Discord bots.' },
    { name: 'league-of-legends', icon: 'fas fa-gamepad', description: 'Find the best League of Legends Discord bots from our list of the best Discord bots.' },
    { name: 'leveling', icon: 'fas fa-trophy', description: 'Find the most advanced Leveling Discord bots from our list of the best Discord bots.' },
    { name: 'logging', icon: 'fas fa-tree', description: 'Find the best logging Discord bots from our list of the best Discord bots, with staff logs and more.' },
    { name: 'media', icon: 'fas fa-photo-video', description: 'Find the best media Discord bots from our list of the best Discord bots.' },
    { name: 'meme', icon: 'fas fa-grin-tears', description: 'Find the best EPIC meme Discord bots from our list of the best Discord bots, with bots like Dank Memer and many other classics.' },
    { name: 'minecraft', icon: 'fas fa-gamepad', description: 'Find the best Minecraft Discord bots from our list of the best Discord bots.' },
    { name: 'mixer', icon: 'fab fa-mixer', description: 'Find the best Mixer Discord bots from our list of the best Discord bots, and other live streaming bots.' },
    { name: 'moderation', icon: 'fas fa-gavel', description: 'Find the best moderation Discord bots from our list of the best Discord bots, with bots like Mee6, Dyno bot and much more.' },
    { name: 'multipurpose', icon: 'fas fa-adjust', description: 'Find the best multipurpose Discord bots from our list of the best Discord bots, with many all-in-one features.' },
    { name: 'music', icon: 'fas fa-music', description: 'Find the best music Discord bots from our list of the best Discord bots, with bots like Groovy, Rythm, Octave, and many more epic bots.' },
    { name: 'pokemon', icon: 'fas fa-gamepad', description: 'Find the best Pokemon Discord bots from our list of the best Discord bots.' },
    { name: 'pugb', icon: 'fas fa-gamepad', description: 'Find the best PUBG Discord bots from our list of the best Discord bots.' },
    { name: 'reddit', icon: 'fab fa-reddit', description: 'Find the best Reddit Discord bots from our list of the best Discord bots.' },
    { name: 'roblox', icon: 'fas fa-gamepad', description: 'Find the best Roblox Discord bots from our list of the best Discord bots.' },
    { name: 'rocket-league', icon: 'fas fa-gamepad', description: 'Find the best Rocket League Discord bots from our list of the best Discord bots.' },
    { name: 'roleplay', icon: 'fas fa-theater-masks', description: 'Find the best Roleplay Discord bots from our list of the best Discord bots.' },
    { name: 'roles', icon: 'fas fa-at', description: 'Find the best anime role management bots from our list of the best Discord bots.' },
    { name: 'runescape', icon: 'fas fa-gamepad', description: 'Find the best Runescape Discord bots from our list of the best Discord bots.' },
    { name: 'soundboard', icon: 'fas fa-volume-up', description: 'Find the best soundboard Discord bots from our list of the best Discord bots.' },
    { name: 'twitch', icon: 'fab fa-twitch', description: 'Find the best Twitch bots from our list of the best Discord bots, and more live streaming bots.' },
    { name: 'twitter', icon: 'fab fa-twitter', description: 'Find the best Twitter Discord bots from our list of the best Discord bots.' },
    { name: 'utility', icon: 'fas fa-cogs', description: 'Find the best utility Discord bots from our list of the best Discord bots.' },
    { name: 'valorant', icon: 'fas fa-gamepad', description: 'Find the best Valorant Discord bots from our list of the best Discord bots.' },
    { name: 'verification', icon: 'fa fa-check-circle', description: 'Find the best verification Discord bots from our list of the best Discord bots, and more bots that can help secure your servers.' },
    { name: 'web-dashboard', icon: 'fas fa-cogs', description: 'Find the best web dashboard Discord bots from our list of the best Discord bots.' },
    { name: 'youtube', icon: 'fab fa-youtube', description: 'Find the best YouTube Discord bots from our list of the best Discord bots, and other music and live streaming bots.' }
  ];

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

  approveBot(id: string, reason: string) {
    return this.http.post(`${this.endpoint}/${id}/review?key=${this.key}`, {
      approved: true,
      reason
    } as Judgement).toPromise() as Promise<any>;
  }
  declineBot(id: string, reason: string) {
    return this.http.post(`${this.endpoint}/${id}/review?key=${this.key}`, {
      approved: false,
      reason
    } as Judgement).toPromise() as Promise<any>;    
  }
}

export interface Judgement {
  approved: boolean;
  reason: string;
}

export interface Tag {
  description: string;
  icon: string;
  name: string;
}
