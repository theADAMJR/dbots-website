import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { BotsService } from 'src/app/services/bots.service';
import { UserService } from 'src/app/services/user.service';
import { SEOService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-log-module',
  templateUrl: './log-module.component.html',
  styleUrls: ['./log-module.component.css']
})
export class LogModuleComponent implements OnInit {
  bot: any;
  user: any;

  members: any[];

  displayedColumns: string[] = ['number', 'by', 'old', 'new', 'at'];
  dataSource = new MatTableDataSource();
  changes: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private botService: BotsService,
    private route: ActivatedRoute,
    private seo: SEOService,
    public userService: UserService) {}

  async ngOnInit() {
    await this.botService.init();

    const id = this.route.snapshot.paramMap.get('id');
    this.bot = this.botService.getSavedBot(id);
    this.user = this.botService.getBot(id);

    this.seo.setTags({
      titlePrefix: 'DBots',
      titleSuffix: `${this.user.username} Logs`,
      description: 'View bot logs and changes to the bot listing.',
      url: `dashboard/bots/${id}/log`
    });

    const log = await this.botService.getSavedLog(id);
    this.changes = log.changes.reverse();
    
    this.dataSource = new MatTableDataSource(this.changes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator)
      this.dataSource.paginator.firstPage();
  }
}
