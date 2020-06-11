import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { BotsService, Tag } from './bots.service';

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
    this.service.bots.sort((a, b) => b.votes.length - a.votes.length);
  }

  search(query: string) {
    if (this.paginator)
      this.paginator.firstPage();
      
    if (query.length > 0) {
      this.title = `Results for '${query}'`;
      
      // this.bots = // get new bots, with query, from API
      
      const resultsSize = 8;
      this.paginator.pageIndex = this.service.bots.length / resultsSize;
    } else {
      this.title = 'Top';

      // get cached top 8 bots
    }
    
    this.query = query;
  }

  searchByTag(tag: Tag) {
    this.title = `Bots tagged '${tag.name}'`;
    this.description = tag.description;
    this.tag = tag;
  }

  goToPage(number: number) {
    // this.paginator
    alert(`go to page ${number}`);
  }
}
