import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { BotsComponent } from '../bots.component';
import { Router, ActivatedRoute } from '@angular/router';
import { SEOService as SEOService } from 'src/app/services/seo.service';
import { kebabToLowerCase, kebabToTitleCase } from 'src/app/utils';
import { TagService } from 'src/app/services/tag.service';
import { Location } from '@angular/common';
import { SearchComponent } from 'src/app/search/search.component';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'search-wrapper',
  templateUrl: './search-wrapper.component.html',
  styleUrls: ['./search-wrapper.component.css']
})
export class SearchWrapperComponent implements AfterViewInit {
  @ViewChild('bots') botsComponent: BotsComponent;
  @ViewChild('searchInput') searchInput: SearchComponent;

  focused = false;
  placeholder = '';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private seo: SEOService,
    public tagService: TagService,
    private themeService: ThemeService) {
    this.placeholder = kebabToLowerCase(this.getRandomPlaceholder());
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const query = this.route.snapshot.queryParamMap.get('q');      
      if (query)
        this.search(query);

      this.route.paramMap.subscribe(map => {
        const tagName = map.get('tag');
        if (tagName)
          this.searchByTag(tagName);
      });
      this.themeService.setNavbarBackground();
    });
  }

  getRandomPlaceholder() {
    const i = Math.floor(Math.random() * (this.tagService.tags.length - 1));
    return this.tagService.tags[i].name;
  }

  search(query: string) {
    this.location.go('search', `?q=${query}`);

    this.seo.setTags(({
      description: `Find bots similar to '${query}'.`,
      titlePrefix: `${query} Bots`,
      url: `search/q?=${query}`
    }));

    return this.botsComponent.search(query);
  }

  searchByTag(name: string) {
    const tag = this.tagService.getTag(name);
    this.botsComponent.searchByTag(tag);    

    this.seo.setTags({
      description: tag.description,
      titlePrefix: `${kebabToTitleCase(tag.name)} Bots`,
      url: `tags/${tag.name}`
    });
  }
}