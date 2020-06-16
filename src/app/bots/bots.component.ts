import { Component,  ViewChild, Input, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { BotsService, Tag } from './bots.service';
import { kebabToTitleCase } from '../utils';

@Component({
  selector: 'bots',
  templateUrl: './bots.component.html',
  styleUrls: ['./bots.component.css']
})
export class BotsComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;

  title = 'Top';
  icon = 'fas fa-robot';
  description = 'The highest rated bots this week.';
  query = '';

  bots = [];
  savedBots = [];
  @Input() tag: Tag;

  constructor(public service: BotsService) {}

  async ngOnInit() {
    await this.service.init();

    if (this.tag) {
      const { bots, saved } = (this.tag.name !== 'new')
        ? this.service.getTaggedBots(this.tag.name)
        : this.service.getNewBots();
      
      this.bots = bots;
      this.savedBots = saved;

      this.searchByTag(this.tag);
    } else {
      this.savedBots = this.service.savedBots;
      this.bots = this.service.bots;
    }
  }
  
  search(query: string) {
    this.query = query;

    if (this.paginator)
      this.paginator.firstPage();
      
    (query.length > 0)
      ? this.setSearchLayout()
      : this.setDefaultLayout();
  }

  private setDefaultLayout() {
    this.title = 'Top';
    this.icon = 'fas fa-robot';
  }

  private setSearchLayout() {
    this.title = `Results for '${this.query}'`;
    this.icon = 'fas fa-search';
    const resultsSize = 8;
    this.paginator.pageIndex = this.service.savedBots.length / resultsSize;
  }

  searchByTag(tag: Tag) {    
    this.title = `${kebabToTitleCase(tag.name)} Bots`;
    this.icon = tag.icon;
    this.description = tag.description;
    this.tag = tag;
  }

  goToPage(number: number) {
    alert(`go to page ${number}`);
  }
}
