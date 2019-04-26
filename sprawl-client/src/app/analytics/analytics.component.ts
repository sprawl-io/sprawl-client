import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent implements OnInit {

  private tasksUrl = 'http://sprawl.us-east-2.elasticbeanstalk.com/api/task/stats';

  private data : any;
  private tsEstData: any;
  private tsTotalData: any;
  private tsEstDataTags: any;

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Time';
  showYAxisLabel = true;
  yAxisLabel = 'Est. Accuracy';
  showGridLines = true;
  maxXAxisTickLength = 10;
  trimXAxisTicks = true;

  tsEstDataX = 'Time';
  tsEstDataY = 'Est. Accuracy'

  tsTotalDataX = 'Time';
  tsTotalDataY = 'Tasks Completed'

  colorScheme = {
    domain: ['#a8385d', '#7aa3e5', '#a27ea8', '#aae3f5', '#adcded', '#a95963', '#8796c0', '#7ed3ed', '#50abcc', '#ad6886']
  };

  // line, area
  autoScale = true;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getStats();
    this.getTimeSeriesEstData();
    this.getTimeSeriesTotalData();
    this.getTimeSeriesEstDataByTag();
  }

  getStats() {
    this.http.get(this.tasksUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('auth_token')
      }
    }).subscribe(e => this.data = e);
  }

  getTimeSeriesEstData() {
    this.http.get(this.tasksUrl + '/timeseries/estimation', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('auth_token')
      }
    }).subscribe(e => this.tsEstData = e);
  }

  getTimeSeriesTotalData() {
    this.http.get(this.tasksUrl + '/timeseries/totaltasks', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('auth_token')
      }
    }).subscribe(e => this.tsTotalData = e);
  }

  getTimeSeriesEstDataByTag() {
    this.http.get(this.tasksUrl + '/timeseries/estimation/tag', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('auth_token')
      }
    }).subscribe(e => this.tsEstDataTags = e);
  }

  getDifferencePercentage(x: number, y: number): number {
      return (Math.abs(x - y)/((x + y)/2))*100;
  }


}
