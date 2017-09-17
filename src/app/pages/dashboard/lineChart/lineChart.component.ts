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
  isDataAvailable:boolean = false;

  constructor(private _lineChartService:LineChartService,private _baConfig:BaThemeConfigProvider) {

           
  }

  ngOnInit() 
  {

      this._lineChartService.getData().map(res => res.json()).subscribe(res =>{
        
        this.response=res;

        let datavalues:any = [];
        for (var i = 0; i < this.response.length; i++) 
        {

          let obj:any = { };
            obj.date = new Date( parseInt(this.response[i].year),parseInt(this.response[i].month));
            obj.value = parseInt(this.response[i].value);

          datavalues.push(obj);

        }
        
        this.isDataAvailable = true;
          
        this.prepareChart( datavalues );

      });   
  }


  prepareChart( datavalues:any )
  {
        console.log(datavalues);
        var layoutColors = this._baConfig.get().colors;
        var graphColor = this._baConfig.get().colors.custom.dashboardLineChart;

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

