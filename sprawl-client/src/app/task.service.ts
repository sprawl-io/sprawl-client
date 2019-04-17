import { Injectable } from '@angular/core';
import { Task } from './tasks/task';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksUrl = 'http://localhost:8080/api/task/';
  readonly getTasksObservable: BehaviorSubject<Task[]>;

  constructor(private http: HttpClient) {
    this.getTasksObservable = new BehaviorSubject<Task[]>([]);
  }

  getTasks(): Observable<Task[]> {
    this._getTasks().subscribe(e => this.getTasksObservable.next(e));
    return this.getTasksObservable;
  }

  _getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('auth_token')
      }
    });
  }

  startTask(id: string): Observable<boolean> {
    return this.http.post(this.tasksUrl + id + '/start', '', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('auth_token')
      },
      observe: 'response' as body
    }).map((resp: any): boolean => {
      if (resp.status === 200) {
        return true;
      } else {
        return false;
      }
    });
  }

  stopTask(id: string): Observable<boolean> {
    return this.http.post(this.tasksUrl + id + '/stop', '', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('auth_token')
      },
      observe: 'response' as body
    }).map((resp: any): boolean => {
      if (resp.status === 200) {
        return true;
      } else {
        return false;
      }
    });
  }

  finishTask(id: string): Observable<boolean> {
    return this.http.post(this.tasksUrl + id + '/finish', '', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('auth_token')
      },
      observe: 'response' as body
    }).map((resp: any): boolean => {
      if (resp.status === 200) {
        return true;
      } else {
        return false;
      }
    });
  }
}
