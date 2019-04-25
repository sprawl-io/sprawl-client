import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  private tasksUrl = 'http://localhost:8080/api/task/stats';

  private data : any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getStats();
  }

  getStats() {
    this.http.get(this.tasksUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('auth_token')
      }
    }).subscribe(e => this.data = e);
  }

  getDifferencePercentage(x: number, y: number): number {
      return (Math.abs(x - y)/((x + y)/2))*100;
  }


}
