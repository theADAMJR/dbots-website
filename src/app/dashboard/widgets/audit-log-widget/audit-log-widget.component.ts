import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BotsService } from 'src/app/bots/bots.service';

@Component({
  selector: 'audit-log-widget',
  templateUrl: './audit-log-widget.component.html',
  styleUrls: ['./audit-log-widget.component.css']
})
export class AuditLogWidgetComponent implements OnInit {
  rows = 3;

  changeCount = 0;
  members: any[];
  changes: any[];

  constructor(
    private route: ActivatedRoute,
    private botService: BotsService) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(async(val) => {
      const id = val.get('id');
  
      const { changes } = await this.botService.getSavedLog(id);
      this.changeCount = changes.length;
      this.changes = changes.splice(changes.length - this.rows, changes.length);
    });
  }

  getMember(id: string) {          
    return this.members.find(m => m.id === id) || {};
  }
}
