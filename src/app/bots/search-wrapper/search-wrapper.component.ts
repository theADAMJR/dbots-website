import { Component, OnInit, ViewChild } from '@angular/core';
import { BotsComponent } from '../bots.component';
import { Router, ActivatedRoute } from '@angular/router';
import { SeoService as SEOService } from 'src/app/services/seo.service';

@Component({
  selector: 'search-wrapper',
  templateUrl: './search-wrapper.component.html',
  styleUrls: ['./search-wrapper.component.css']
})
export class SearchWrapperComponent {
  @ViewChild('searchInput') searchInput: any;

  placeholder = '';
  tag: Tag;

  // TODO: move to bots service
  tags: Tag[] = [
    { name: 'music', description: 'Search for good music bots' },
    { name: 'moderation', description: 'Find ' },
    { name: 'social', description: 'Find ' },
    { name: 'utility', description: 'Find ' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seo: SEOService) {
    this.placeholder = this.getRandomPlaceholder();

    this.route.paramMap.subscribe(map => {
      const tagName = map.get('tag');

      this.tag = this.findTag(tagName);
    });
  }

  getRandomPlaceholder() {
    const i = Math.floor(Math.random() * (this.tags.length - 1));
    return this.tags[i].name;
  }

  search(query: string) {
    const extra = (query) ? { queryParams: { q: query } } : {};
    this.router.navigate(['search'], extra);

    this.updateMetaTags();
  }

  searchByTag(name: string) {
    this.tag = this.findTag(name);

    this.updateMetaTags();
  }

  updateMetaTags() {
    this.seo.setTags({
      description: this.tag.description,
      titleSuffix: `${this.tag.name} Bots`,
      url: `tags/${this.tag.name}`
    });
  }

  private findTag(name: string) {
    return this.tags.find(t => t.name === name)
  }
}

export interface Tag {
  description: string;
  name: string;
}
