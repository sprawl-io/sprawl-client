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
  readonly getParamTaskObservable: Map<string, BehaviorSubject<Task>>;

  constructor(private http: HttpClient) {
    this.getTasksObservable = new BehaviorSubject<Task[]>([]);
    this.getParamTaskObservable = new Map<string, BehaviorSubject<Task>>();
  }

  bindParamTask(id: string): BehaviorSubject<Task> {
    if (!this.getParamTaskObservable.has(id)) {
      this.getParamTaskObservable.set(id, new BehaviorSubject<Task>(undefined));
    }
    return this.getParamTaskObservable.get(id);
  }

  getParamTask(id: string): Observable<Task> {
    const obs = this.bindParamTask(id);
    this._getParamTask(id).subscribe(e => obs.next(e));
    return obs;
  }

  _getParamTask(id: string): Observable<Task> {
    return this.http.get<Task>(this.tasksUrl + id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('auth_token')
      }
    });
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
      observe: 'response'
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
      observe: 'response'
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
      observe: 'response'
    }).map((resp: any): boolean => {
      console.log(resp);
      if (resp.status === 200) {
        return true;
      } else {
        return false;
      }
    });
  }

  deleteTask(id: string): Observable<boolean> {
    return this.http.delete(this.tasksUrl + id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('auth_token')
      },
      observe: 'response'
    }).map((resp: any): boolean => {
      console.log(resp);
      if (resp.status === 200) {
        return true;
      } else {
        return false;
      }
    });
  }

  createTask(title: string, body: string, tags: string[], expDuration: number, workedTime: number): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, {
      'title': title,
      'body': body,
      'expDuration': expDuration,
      'workedTime': workedTime,
      'tags': tags
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('auth_token')
      },
    });
  }
}
