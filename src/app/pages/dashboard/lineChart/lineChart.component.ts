import {Component} from '@angular/core';
import {BaThemeConfigProvider, colorHelper, layoutPaths} from '../../../theme';
import {LineChartService} from './lineChart.service';

@Component({
  selector: 'line-chart',
  templateUrl: './lineChart.html',
  styleUrls: ['./lineChart.scss']
})
export class LineChart {

  chartData:any;
  response:any;

  constructor(private _lineChartService:LineChartService,private _baConfig:BaThemeConfigProvider) {

      this._lineChartService.getData().subscribe(data => this.response = data);

      /*
      this._lineChartService.getData().map(res => res.json()).subscribe(res =>{
        
        this.response=res;

        let datavalues:any = [];

        for (var i = 0; i < this.response.length; i++) {

          let value:Object = {date:new Date(this.response[i].year,this.response[i].month), value:this.response[i].value};

          datavalues.push(value);

        }

      });  

      */

        var layoutColors = this._baConfig.get().colors;
        var graphColor = this._baConfig.get().colors.custom.dashboardLineChart;

     
         var datavalues= [       
            { date: new Date(2013, 2), value: 25000},
            { date: new Date(2013, 3), value: 21000},
            { date: new Date(2013, 4), value: 24000},
            { date: new Date(2013, 5), value: 0},
            { date: new Date(2013, 6), value: 0},
            { date: new Date(2013, 7), value: 0},
            { date: new Date(2013, 8), value: 0},
            { date: new Date(2013, 9), value: 5000},
            { date: new Date(2013, 10), value: 0},
            { date: new Date(2013, 11), value: 20000},
            { date: new Date(2014, 0), value: 0}
          ];

          this.chartData =  {
          type: 'serial',
          theme: 'blur',
          marginTop: 15,
          marginRight: 15,
          responsive: {
            'enabled': true
          },
          dataProvider: datavalues,
          categoryField: 'date',
          categoryAxis: {
            parseDates: true,
            gridAlpha: 0,
            color: layoutColors.defaultText,
            axisColor: layoutColors.defaultText
          },
          valueAxes: [
            {
              minVerticalGap: 50,
              gridAlpha: 0,
              color: layoutColors.defaultText,
              axisColor: layoutColors.defaultText
            }
          ],
          graphs: [
            {
              id: 'g0',
              bullet: 'none',
              useLineColorForBulletBorder: true,
              lineColor: colorHelper.hexToRgbA(graphColor, 0.3),
              lineThickness: 1,
              negativeLineColor: layoutColors.danger,
              type: 'smoothedLine',
              valueField: 'value',
              fillAlphas: 1,
              fillColorsField: 'lineColor'
            }
          ],
          chartCursor: {
            categoryBalloonDateFormat: 'MM YYYY',
            categoryBalloonColor: '#4285F4',
            categoryBalloonAlpha: 0.7,
            cursorAlpha: 0,
            valueLineEnabled: true,
            valueLineBalloonEnabled: true,
            valueLineAlpha: 0.5
          },
          dataDateFormat: 'MM YYYY',
          export: {
            enabled: true
          },
          creditsPosition: 'bottom-right',
          zoomOutButton: {
            backgroundColor: '#fff',
            backgroundAlpha: 0
          },
          zoomOutText: '',
          pathToImages: layoutPaths.images.amChart
        };

 
  }

  initChart(chart:any) {
    let zoomChart = () => {
      chart.zoomToDates(new Date(2013, 3), new Date(2014, 0));
    };

    chart.addListener('rendered', zoomChart);
    zoomChart();

    if (chart.zoomChart) {
      chart.zoomChart();
    }
  }
}

