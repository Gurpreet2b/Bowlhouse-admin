import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as Highcharts from "highcharts";

@Component({
    selector: 'chart',
    // template: `<div id="barChart" style="min-width: 310px; max-width: 800px; height: 400px; margin: 0 auto"></div>`
    template: `<highcharts-chart [Highcharts]="Highcharts" [options]="chartOptions" 
    ></highcharts-chart>`,
    // styles: [`h1 { font-family: Lato; }`]
})
export class ChartPieComponent implements OnInit {
    @Input() SalesChart: any;
    Highcharts: typeof Highcharts = Highcharts;
    public chartOptions: Highcharts.Options | undefined;
    ChartDate: any = [];
    ngOnInit() {
    }
    ngOnChanges() {
        this.chartintialize();
    }


    // barChartPopulation() {
    //     Highcharts.chart('barChart', {
    //       chart: {
    //         type: 'bar'
    //       },
    //       title: {
    //         text: 'Historic World Population by Region'
    //       },
    //       xAxis: {
    //         categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
    //       },
    //       yAxis: {
    //         min: 0,
    //         title: {
    //           text: 'Population (millions)',
    //           align: 'high'
    //         },
    //       },
    //       tooltip: {
    //         valueSuffix: ' millions'
    //       },
    //       plotOptions: {
    //         bar: {
    //           dataLabels: {
    //             enabled: false
    //           }
    //         }
    //       },
    //       series: [{
    //         type: undefined,
    //         name: 'Year 1800',
    //         data: [107, 31, 635, 203, 2]
    //       }, {
    //         type: undefined,
    //         name: 'Year 1900',
    //         data: [133, 156, 947, 408, 6]
    //       }, {
    //         type: undefined,
    //         name: 'Year 2000',
    //         data: [814, 841, 3714, 727, 31]
    //       }, {
    //         type: undefined,
    //         name: 'Year 2016',
    //         data: [1216, 1001, 4436, 738, 40]
    //       }]
    //     });
    //   }

    public chartintialize() {
        this.ChartDate = [];
        for (let i = 0; i < this.SalesChart.length; i++) {
            const element = this.SalesChart[i].name;
            this.ChartDate.push(element);
        }
        this.chartOptions = {
            chart: {
                type: "bar",
                backgroundColor:'transparent',
                width: 500
                
            },
            title: {
                text: ""
            },
            subtitle: {
                text: ""
            },
            xAxis: {
                type: 'datetime',
                categories: this.ChartDate,
                
            },
            yAxis: {
                min: 0,
                title: {
                    text: '',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            credits: {
                enabled: false
            },
            tooltip: {
                valueSuffix: ""
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                    },
                    showInLegend: false,
                },
                column: {colorByPoint: true}
            },
    
            series: [
                {
                    type: 'bar',
                    // color: '#273b48',
                    name: 'Order Sales Amount(AED)',
                    data: this.SalesChart,
                }, 
            ]
        };
    }
}
