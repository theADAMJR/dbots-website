import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

export interface TypingSEO {
  titleSuffix: string;
  description: string;
  url: string;
}
export interface TypingProperty {
  property: string;
  itemprop?: string;
  content: string;
}
export interface TypingName {
  name: string;
  itemprop?: string;
  content: string;
}

@Injectable()
export class SeoService {
  base = {
    title: '3PG',
    titleSuffix: 'Discord Bot'
  }

  constructor(
    private ngMeta: Meta,
    private ngTitle: Title
  ) {
    this.keywords('discord bots, discord bot maker, discord bot commands, discord bot builder, discord bot list');
    this.image('https://3pg.xyz/assets/img/3PGAvatarTransparent.svg');
  }

  get metaInstance() {
    return this.ngMeta;
  }

  setTags(config: TypingSEO) {
    this.title(config.titleSuffix);
    this.description(config.description);
    this.url(config.url);
  }

  private setNameTag(name: TypingName) {
    const property = {
      name: name.name,
      content: name.content,
    };
    if (name.itemprop && name.itemprop !== '')
      property['itemprop'] = name.itemprop;
    if (this.ngMeta.getTag(`name="${property.name}"`))
      this.ngMeta.updateTag(property);
    else
      this.ngMeta.addTag(property);
  }
  
  private setPropertyTag(prop: TypingProperty) {
    const property = {
      property: prop.property,
      content: prop.content,
    };
    if (prop.itemprop !== undefined && prop.itemprop !== '')
      property['itemprop'] = prop.itemprop;
    if (this.ngMeta.getTag(`property="${property.property}"`))
      this.ngMeta.updateTag(property);
    else
      this.ngMeta.addTag(property);
  }

  private url(content: string) {
    this.ngMeta.updateTag({ property: 'og:url', itemprop: 'url', content: `${environment.url}/${content}` });
  }

  private title(titleSuffix = this.base.titleSuffix) {
    const setTitle = (titleSuffix !== undefined && titleSuffix !== '') ? `${this.base.title} - ${titleSuffix}` : this.base.title;
    this.ngTitle.setTitle(setTitle);
    this.setPropertyTag({ property: 'og:title', itemprop: 'title', content: setTitle });
    this.setPropertyTag({ property: 'twitter:title', itemprop: 'title', content: setTitle });
  }

  private description(content: string) {
    this.setNameTag({ name: 'description', itemprop: 'description', content: content });
    this.setPropertyTag({ property: 'og:description', itemprop: 'description', content: content });
    this.setPropertyTag({ property: 'twitter:description', itemprop: 'description', content: content });
  }

  private image(content: string) {
    this.setPropertyTag({ property: 'twitter:image', itemprop: 'image', content: content });
    this.setPropertyTag({ property: 'og:image', itemprop: 'image', content: content });
    this.setPropertyTag({ property: 'og:image:secure_url', itemprop: 'image', content: content });
  }

  private keywords(content: string) {
    this.setNameTag({ name: 'keywords', itemprop: 'keywords', content: content });
  }
}