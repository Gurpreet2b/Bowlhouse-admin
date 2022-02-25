import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as Highcharts from "highcharts";

@Component({
    selector: `chartPie`,
    template: `<highcharts-chart [Highcharts]="Highcharts" [options]="chartOptions"
     style = "width: 330px; height: 300px; display: block;"></highcharts-chart>`,
    //   styleUrls: ['./app.component.css']
})
export class ChartComponent implements OnInit, OnChanges  {
   
    @Input() RestaurantChart: any;
    Highcharts: typeof Highcharts = Highcharts;
    public chartOptions: Highcharts.Options | undefined;

    ngOnInit() {
    }
    ngOnChanges(){
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
            pointFormat: '{series.name}: <b>{point.y} ({point.percentage:.1f}%)</b>',
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
                    style: {
                        fontSize: '5px'                
                    },
                    connectorShape: 'straight',
                    // distance: -60,
                },
                showInLegend: true,
            },
        },
        legend: {
            align: 'right',
            verticalAlign: 'top',
            layout: 'vertical',
            x: 0,
            y: 70,
            itemMarginTop: 10,
            itemDistance:50
        },
        series: [{
            type: 'pie',
            name: 'Cuisine Ordered',
            data: this.RestaurantChart,
            size: '100%',
        }]
     };
    }
}
