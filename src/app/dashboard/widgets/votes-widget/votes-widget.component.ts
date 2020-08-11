import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import pluginDataLabels from 'chartjs-plugin-datalabels';
import { BotsService } from 'src/app/services/bots.service';

@Component({
  selector: 'votes-widget',
  templateUrl: './votes-widget.component.html',
  styleUrls: ['./votes-widget.component.css']
})
export class VotesWidgetComponent implements OnInit {
  @Input() id: string;

  stats: any;
  chartReady = false;
  
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{ display: false }],
      xAxes: [{ display: false }]
    },
    plugins: {
      datalabels: { anchor: 'end', align: 'end' }
    }
  };
  barChartLabels = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [pluginDataLabels];

  barChartData: ChartDataSets[] = [];

  constructor(private botsService: BotsService) {}
    
  async ngOnInit() {
    this.stats = await this.botsService.getStats(this.id);

    this.barChartLabels = this.buildLabels();
    this.barChartData = this.buildDataSets();
    
    this.chartReady = true;
  }

  buildLabels() {
    return this.stats.recentVotes.map(v => v.day);
  }

  buildDataSets() {
    return [
      { data: this.stats.recentVotes.map(s => s.count), label: 'All' }
    ];
  }
}