import { Component, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';
import { BotsComponent } from '../bots.component';
import { Router, ActivatedRoute } from '@angular/router';
import { SEOService as SEOService, TypingSEO } from 'src/app/services/seo.service';
import { BotsService, Tag } from '../bots.service';
import { capitalize } from 'src/app/utils';

@Component({
  selector: 'search-wrapper',
  templateUrl: './search-wrapper.component.html',
  styleUrls: ['./search-wrapper.component.css']
})
export class SearchWrapperComponent implements AfterViewInit {
  @ViewChild('bots') botsComponent: BotsComponent;
  @ViewChild('searchInput') searchInput: any;

  placeholder = '';

  constructor(
    public service: BotsService,
    private route: ActivatedRoute,
    private router: Router,
    private seo: SEOService) {
    this.placeholder = this.getRandomPlaceholder();
  }

  ngAfterViewInit() {
    this.route.paramMap.subscribe(map => {
      const tagName = map.get('tag');
      if (tagName)
        this.searchByTag(tagName);
    });
  }

  getRandomPlaceholder() {
    const i = Math.floor(Math.random() * (this.service.tags.length - 1));
    return this.service.tags[i].name;
  }

  search(query: string) {
    const extra = (query) ? { queryParams: { q: query } } : {};
    this.router.navigate(['search'], extra);

    this.updateMetaTags({
      description: `Find Discord bots similar to ${query}.`,
      titleSuffix: `${query} Bots`,
      url: `search/q?=${query}`
    });
  }

  searchByTag(name: string) {
    const tag = this.service.findTag(name);
    this.botsComponent.searchByTag(tag);

    this.updateMetaTags({
      description: tag.description,
      titleSuffix: `${capitalize(tag.name)} Bots`,
      url: `tags/${tag.name}`
    });
  }

  updateMetaTags(content: TypingSEO) {
    this.seo.setTags(content);
  }
}