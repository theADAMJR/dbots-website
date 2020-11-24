import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TagService {
  tags: Tag[] = [
    { name: 'anime', icon: 'far fa-circle', description: 'Find the best anime bots from our list.' },
    { name: 'chat', icon: 'fas fa-comments', description: 'Find the best chat bots from our list.' },
    { name: 'customizable', icon: 'fas fa-cogs', description: 'Find the best customizable bots from our list.' },
    { name: 'economy', icon: 'fas fa-coins', description: 'Find the best economy bots from our list.' },
    { name: 'games', icon: 'fas fa-gamepad', description: 'Find the best Games bots from our list.' },
    { name: 'fun', icon: 'fas fa-grin-tears', description: 'Find the most fun bots from our list.' },
    { name: 'leveling', icon: 'fas fa-trophy', description: 'Find the most advanced Leveling bots from our list.' },
    { name: 'logging', icon: 'fas fa-tree', description: 'Find the best logging bots from our list, with staff logs and more.' },
    { name: 'media', icon: 'fas fa-photo-video', description: 'Find the best media bots from our list.' },
    { name: 'meme', icon: 'fas fa-grin-tears', description: 'Find the best EPIC meme bots from our list, with bots like Dank Memer and many other classics.' },
    { name: 'mixer', icon: 'fab fa-mixer', description: 'Find the best Mixer bots from our list, and other live streaming bots.' },
    { name: 'moderation', icon: 'fas fa-gavel', description: 'Find the best moderation bots from our list, with bots like Mee6, Dyno bot and much more.' },
    { name: 'multipurpose', icon: 'fas fa-adjust', description: 'Find the best multipurpose bots from our list, with many all-in-one features.' },
    { name: 'music', icon: 'fas fa-music', description: 'Find the best music bots from our list, with bots like Groovy, Rythm, Octave, and many more epic bots.' },
    { name: 'reddit', icon: 'fab fa-reddit', description: 'Find the best Reddit bots from our list.' },
    { name: 'roleplay', icon: 'fas fa-theater-masks', description: 'Find the best Roleplay bots from our list.' },
    { name: 'roles', icon: 'fas fa-at', description: 'Find the best anime role management bots from our list.' },
    { name: 'soundboard', icon: 'fas fa-volume-up', description: 'Find the best soundboard bots from our list.' },
    { name: 'twitch', icon: 'fab fa-twitch', description: 'Find the best Twitch bots from our list, and more live streaming bots.' },
    { name: 'twitter', icon: 'fab fa-twitter', description: 'Find the best Twitter bots from our list.' },
    { name: 'utility', icon: 'fas fa-cogs', description: 'Find the best utility bots from our list.' },
    { name: 'verification', icon: 'fa fa-check-circle', description: 'Find the best verification bots from our list, and more bots that can help secure your servers.' },
    { name: 'web-dashboard', icon: 'fas fa-cogs', description: 'Find the best web dashboard bots from our list.' },
    { name: 'youtube', icon: 'fab fa-youtube', description: 'Find the best YouTube bots from our list, and other music and live streaming bots.' }
  ];

  getTag(name: string) {
    return this.tags.find(t => t.name === name);
  }
}

export interface Tag {
  description: string;
  icon: string;
  name: string;
}
