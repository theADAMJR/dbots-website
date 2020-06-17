import { Component,  ViewChild, Input, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { BotsService, Tag } from './bots.service';
import { kebabToTitleCase } from '../utils';

@Component({
  selector: 'bots',
  templateUrl: './bots.component.html',
  styleUrls: ['./bots.component.css']
})
export class BotsComponent implements OnInit, AfterViewInit {
  @ViewChild('paginator') paginator: MatPaginator;

  title = 'Top';
  icon = 'fas fa-robot';
  description = 'The highest rated bots this week.';
  query = '';

  bots = [];
  savedBots = [];
  @Input() tag: Tag;

  initialized = false;

  constructor(public service: BotsService) {}

  async ngOnInit() {
    await this.service.init();

    if (this.tag) {
      const { bots, saved } = (this.tag.name !== 'new')
        ? this.service.getTaggedBots(this.tag.name)
        : this.service.getNewBots();
      
      this.bots = bots;
      this.savedBots = saved;

      this.setTagLayout(this.tag);
    } else
      this.resetBots();

    this.initialized = true;
  }

  ngAfterViewInit() {
    this.resetPaginator();
  }

  private resetPaginator() {
    if (this.paginator) {
      this.paginator.firstPage();
      this.paginator.length = this.bots.length;
      this.paginator.pageSize = 8;
    }
  }

  private resetBots() {
    this.savedBots = this.service.savedBots;
    this.bots = this.service.bots;

    this.resetPaginator();
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

    this.resetBots();
  }

  private setSearchLayout() {
    this.title = `Results for '${this.query}'`;
    this.description = `Find Discord bots similar to '${this.query}'.`
    this.icon = 'fas fa-search';
  }

  setTagLayout(tag: Tag) {
    this.title = `${kebabToTitleCase(tag.name)} Bots`;
    this.icon = tag.icon;
    this.description = tag.description;
    this.tag = tag;
    
    this.resetPaginator();
  }
}
