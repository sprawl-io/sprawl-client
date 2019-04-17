import { Component, OnInit } from '@angular/core';
import { Task } from './task';
import { TASKS } from './mock-tasks';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks = TASKS;

  constructor() { }

  ngOnInit() {
  }

  getProgressPercent(task: Task) {
      return (task.workedTime / task.expDuration).toFixed(2) + '%';
  }

  getPerformancePercent(task: Task) {
      const performance = 100.00 - (task.workedTime / task.expDuration);
      let msg = performance.toFixed(2);

      if (performance < 0) {
        msg += '% slower than expected';
      } else {
        msg += '% faster than expected';
      }

      return msg;
  }

  isOvertime(task: Task) {
      if (task.workedTime <= task.expDuration ) {
          return false;
      } else {
          return true;
      }
  }
  parseISOString(s) {
    const b = s.split(/\D+/);
    const date = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    return 'Last Worked on ' + date.toLocaleString();
  }


}
