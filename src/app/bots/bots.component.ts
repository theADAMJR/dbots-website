import { Component, OnInit, ViewChild } from '@angular/core';
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
  description = 'The highest rated bots this week.';
  query = '';

  tag: Tag;

  constructor(public service: BotsService) {}

  ngOnInit() {
    this.service.savedBots
      .sort((a, b) => b.votes.length - a.votes.length);
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
  }

  private setSearchLayout() {
    this.title = `Results for '${this.query}'`;
    const resultsSize = 8;
    this.paginator.pageIndex = this.service.savedBots.length / resultsSize;
  }

  searchByTag(tag: Tag) {
    this.title = `Bots tagged '${kebabToTitleCase(tag.name)}'`;
    this.description = tag.description;
    this.tag = tag;
  }

  goToPage(number: number) {
    alert(`go to page ${number}`);
  }
}
