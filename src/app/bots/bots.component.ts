import { Component,  Input, OnInit, AfterViewInit } from '@angular/core';
import { BotsService } from '../services/bots.service';
import { kebabToTitleCase } from '../utils';
import { Tag } from '../services/tag.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bots',
  templateUrl: './bots.component.html',
  styleUrls: ['./bots.component.css']
})
export class BotsComponent implements OnInit, AfterViewInit {
  page = 1;
  size = 8;

  title = 'Top';
  icon = 'fas fa-robot';
  description = 'The highest rated bots this week.';
  query = '';

  bots = [];
  savedBots = [];
  @Input() tag: Tag;

  initialized = false;

  get lastPage() { return Math.ceil(this.bots.length / this.size); }

  constructor(
    public service: BotsService,
    private router: Router) {}

  async ngOnInit() {
    await this.service.init();

    if (this.tag) {
      var bots = [],
          saved = [];
        
      if (this.tag.name === 'featured')
        var { bots, saved } = this.service.getFeaturedBots();
      else if (this.tag.name === 'new')
        var { bots, saved } = this.service.getNewBots();
      else
        var { bots, saved } = this.service.getTaggedBots(this.tag.name);

      this.bots = bots;
      this.savedBots = saved;

      this.setTagLayout(this.tag);
    } else
      this.loadBots();

    this.initialized = true;  
    
    this.router.navigate(['/']);  
  }

  ngAfterViewInit() {
    this.resetPaginator();
  }

  private resetPaginator(page = 1) {
    this.page = page;
  }

  private loadBots(page = 1) {
    const { bots, saved } = this.service.getTopBots();
    this.bots = bots;
    this.savedBots = saved;

    this.resetPaginator(page);
  }
  
  search(query: string) {
    this.query = query;

    const { bots, saved } = this.service.searchBots(query);
    this.bots = bots;
    this.savedBots = saved;
    
    this.resetPaginator();
      
    (query.length > 0)
      ? this.setSearchLayout()
      : this.setDefaultLayout();
  }

  private setDefaultLayout() {
    this.title = 'Top';
    this.icon = 'fas fa-robot';
    this.description = 'The highest rated bots this week.'

    this.loadBots();
  }

  private setSearchLayout() {
    this.title = `Results for '${this.query}'`;
    this.description = `Find bots similar to '${this.query}'.`
    this.icon = 'fas fa-search';
  }

  setTagLayout(tag: Tag) {
    this.title = `${kebabToTitleCase(tag.name)} Bots`;
    this.icon = tag.icon;
    this.description = tag.description;
    this.tag = tag;
    
    this.resetPaginator();
  }

  previousPage() {
    this.page = Math.max(this.page - 1, 1);
  }
  nextPage() {
    this.page = Math.min(this.page + 1, this.lastPage);
  }
  
  paginate(array: any[]) {
    return array.slice((this.page - 1) * this.size, this.page * this.size);
  }
}
