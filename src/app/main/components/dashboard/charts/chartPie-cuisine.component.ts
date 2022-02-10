import { Component, Input, OnChanges, OnInit, DoCheck } from '@angular/core';
import * as Highcharts from "highcharts";

@Component({
    selector: `ChartPieCuisine`,
    template: `<highcharts-chart [Highcharts]="Highcharts" [options]="chartOptions"
     style = "width: 510px; height: 400px; display: block;"></highcharts-chart>`,
    //   styleUrls: ['./app.component.css']
})
export class ChartPieCuisineComponent implements OnInit, OnChanges {

    @Input() RestaurantCuisineChart: any[] = [];
    Highcharts: typeof Highcharts = Highcharts;
    public chartOptions: Highcharts.Options | undefined;

    ngOnInit() {
    }
    ngOnChanges() {
        this.chartintialize();
    }

    public chartintialize() {
        this.chartOptions = {
            chart: {
                //  plotBorderWidth: null,
                plotShadow: false,
                backgroundColor:'transparent'
            },
            title: {
                text: ''
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y} ({point.percentage:.1f}%)</b>'
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',

                    dataLabels: {
                        enabled: false,
                        connectorShape: 'straight',
                        // distance: -60,
                    },
                    showInLegend: true
                }
            },
            legend: {
                align: 'right',
                verticalAlign: 'top',
                layout: 'vertical',
                x: 15,
                y: 85,
                itemMarginTop: 5,
                itemDistance:20
            },
            series: [{
                type: 'pie',
                name: 'Order Status',
                data: this.RestaurantCuisineChart,
                size: '80%',
            }]
        };
    }
}
