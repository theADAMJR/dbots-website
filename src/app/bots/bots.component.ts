import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DataSource } from '@angular/cdk/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bots',
  templateUrl: './bots.component.html',
  styleUrls: ['./bots.component.css']
})
export class BotsComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;

  loaded = false;
  tag = '';
  title = 'Top';
  query = '';

  bots = [
    {
      _id: '321',
      guildCount: 10,
      listing: {
        overview: 'A good bot I guess...',
        tags: ['Economy', 'Moderation']
      },
      votes: ['218459216145285121', '218459216145285121']
    },
    {
      _id: '122',
      guildCount: 69420,
      listing: {
        overview: 'Another good bot I guess...',
        tags: ['Leveling', 'Memes']
      },
      votes: ['218459216145285121', '218459216145285121', '218459216145285121', '218459216145285121', '218459216145285121']
    },
    {
      _id: '123',
      guildCount: 20,
      listing: {
        overview: 'Another good bot I guess...',
        tags: ['Leveling', 'Memes']
      },
      votes: ['218459216145285121']
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.bots.sort((a, b) => b.votes.length - a.votes.length);
    setTimeout(() => this.loaded = true, 1000);
    
    this.route.queryParamMap.subscribe(queryMap => {
      const query = queryMap.get('q');
      const page = queryMap.get('p');

      if (query)
        this.search(query);
      if (page)
        this.goToPage(+page);
    });
  }

  search(query: string) {
    if (this.paginator)
      this.paginator.firstPage();
      
    if (query.length > 0) {
      this.title = `Results for '${query}'`;
      
      // this.bots = // get new bots, with query, from API
      
      const resultsSize = 8;
      this.paginator.pageIndex = this.bots.length / resultsSize;
    } else {
      this.title = 'Top';

      // get cached top 8 bots
    }
    
    this.query = query;
  }

  searchByTag(tag: string) {
    this.title = `Bots tagged '${tag}'`;
    this.tag = tag;
  }

  goToPage(number: number) {
    // this.paginator
    alert(`go to page ${number}`);
  }
}
