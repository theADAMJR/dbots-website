import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BotsService {
  endpoint = environment.endpoint + '/bots';
  
  private _userBots: any[];
  get userBots() { return this._userBots; }
  
  private _userSavedBots: any[];
  get userSavedBots() { return this._userSavedBots; }

  constructor(private http: HttpClient) {}
  
  private get key() {
    return localStorage.getItem('key');
  }

  bots = [];
  savedBots = [];
  // TODO: include good keywords for SEO
  tags: Tag[] = [
    { name: 'anime', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'apex-legends', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'chat', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'csgo', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'customizable', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'economy', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'fortnite', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'fun', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'league-of-legends', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'leveling', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'logging', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'media', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'meme', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'minecraft', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'mixer', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'moderation', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'multipurpose', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'music', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'pokemon', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'pugb', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'reddit', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'roblox', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'rocket-league', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'roleplay', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'roles', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'runescape', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'soundboard', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'twitch', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'twitter', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'utility', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'utility', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'valorant', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'verification', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'web-dashboard', icon: '', description: 'A tag that needs a description with keywords.' },
    { name: 'youtube', icon: '', description: 'A tag that needs a description with keywords.' }
  ]

  findTag(name: string) {
    return this.tags.find(t => t.name === name);
  }

  async updateUserBots() {
    this._userBots = (this.key) ?
      await this.http.get(`${this.endpoint}/user?key=${this.key}`).toPromise() as any : null
  }

  async updateUserSavedBots() {
    this._userSavedBots = (this.key) ?
      await this.http.get(`${this.endpoint}/user/saved?key=${this.key}`).toPromise() as any : null
  }
  
  getSavedLog(id: string) {
    return this.http.get(`${this.endpoint}/${id}/log?key=${this.key}`).toPromise() as Promise<any>;
  }
}

export interface Tag {
  description: string;
  icon: string;
  name: string;
}
