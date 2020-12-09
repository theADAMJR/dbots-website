import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  @Input() graphData: any;
  @Input() days = 7;
  
  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{ display: false }],
      xAxes: [{ display: false }]
    },
    plugins: {
      datalabels: { anchor: 'end', align: 'end' }
    }
  };
  chartType: ChartType = 'line';
  chartLegend = true;
  chartPlugins = [pluginDataLabels];

  chartLabels = [];
  chartData = [];

  ngOnInit() {
    this.updateCharts(this.days);
  }

  updateCharts(days: number) {
    this.days = days;

    this.chartLabels = this.buildLabels();
    this.chartData = this.buildDataSets();
  }

  buildLabels(): string[] {
    return Array(this.days)
      .fill(new Date())
      .filter((_, i) => this.filterLabelIndex(i))
      .map((today, i) => new Date(today - 8.64e7 * i)
        .toLocaleDateString()
        .slice(0, 5))
      .reverse();
  }

  filterLabelIndex(index: number) {
    if (this.days === 7)
      return true;
    return index % Math.floor(this.days / 3) === 0;
  }

  buildDataSets(): ChartDataSets[] {        
    return [
      { data: [...this.graphData].map(x => (!x) ? 0 : x), label: 'All' }
    ];
  }
}
