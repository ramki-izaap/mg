import {Component} from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import {BarChartService} from './barChart.service';

@Component({
  selector: 'bar-chart',
  templateUrl: './barChart.html',
  styleUrls: ['./barChart.scss'],
})
export class BarChart {
  
  response:any;
  isDataAvailable:boolean = false;
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {position: 'top'}

  };
  
  public barChartLabels=[];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData=[]; 

  constructor(private barchartService:BarChartService) {

           
  }

  ngOnInit() 
  {

      this.barchartService.getData().map(res => res.json()).subscribe(res =>{
        
        this.response=res;

        console.log(this.response);

        let obj:any=[];

        for (var i = 0; i < this.response.length; i++) 
        {

          this.barChartLabels.push(this.response[i].month);

          obj.push(parseFloat(this.response[i].value));

        }

        this.barChartData = [{     
        data : obj,
        label:'Expense' 
       }];
        
        this.isDataAvailable = true;
          
      });   
  }
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 
  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }
}
