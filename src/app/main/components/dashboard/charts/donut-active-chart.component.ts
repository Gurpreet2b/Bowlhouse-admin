import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as Highcharts from "highcharts";

@Component({
    selector: `donutchartPie`,
    template: `<highcharts-chart [Highcharts]="Highcharts" [options]="chartOptions" 
    style = "width: 435px; height: 350px; display: block;"></highcharts-chart>`,
    //   styleUrls: ['./app.component.css']
})
export class DonutActiveChartComponent implements OnInit, OnChanges {

    @Input() BreakFastData: any;
    @Input() SnacksData: any;
    @Input() LunchData: any;
    @Input() DinnerData: any;
    @Input() LateNightData: any;
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
                // plotBackgroundColor: null,
                backgroundColor:'transparent',
                plotBorderWidth: 0,
                plotShadow: false,
                marginBottom: 20,
                style: {
                    fontSize: '10px'                
                },
            },
            title: {
                // text: '<strong>1137<br>streams</strong>',
                // align: 'center',
                // verticalAlign: 'middle',
                // y: 0,
                text: '',
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y} ({point.percentage:.1f}%)</b>',
                shadow: false
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
                        distance: 50,
                        style: {
                            fontSize: '8px',
                            alignTo: 'connectors',
                        },
                        connectorShape: 'straight',
                    },
                    startAngle: -90,
                    endAngle: -180,
                    center: ['50%', '50%'],
                    size: '65%',
                    showInLegend: true
                }
            },
            legend: {
                align: 'right',
                verticalAlign: 'top',
                layout: 'vertical',
                x: 20,
                y: 70,
                itemMarginBottom: 5
            },

            series: [{
                type: 'pie',
                name: 'Sales (AED)',
                data: [
                    {
                        name: 'Breakfast',
                        y: this.BreakFastData.amount,
                    },
                    {
                        name: 'Lunch',
                        y: this.LunchData.amount,
                    },
                    {
                        name: 'Snacks',
                        y: this.SnacksData.amount,
                    },
                    {
                        name: 'Dinner',
                        y: this.DinnerData.amount,

                    }, {
                        name: 'Late Night',
                        y: this.LateNightData.amount,

                    }],
                size: '60%',
                color: '#ffffff',
                innerSize: '60%',
            }, {
                type: 'pie',
                name: 'Total Orders',
                data: [
                    {
                        name: 'Breakfast',
                        y: this.BreakFastData.count,
                    },
                    {
                        name: 'Lunch',
                        y: this.LunchData.count,
                    },
                    {
                        name: 'Snacks',
                        y: this.SnacksData.count,
                    },
                    {
                        name: 'Dinner',
                        y: this.DinnerData.count,

                    }, {
                        name: 'Late Night',
                        y: this.LateNightData.count,

                    }],
                size: '80%',
                innerSize: '80%',
                color: 'red',
            }],
        };
    }
}
