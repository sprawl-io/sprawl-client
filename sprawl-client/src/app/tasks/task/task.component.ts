import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task: Task = null;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onUpdate: EventEmitter<string>;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onDelete: EventEmitter<string>;

  constructor(private taskService: TaskService) {
    this.controlTask = this.controlTask.bind(this);
    this.finishTask = this.finishTask.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);

    this.onUpdate = new EventEmitter<string>();
    this.onDelete = new EventEmitter<string>();
  }

  ngOnInit() {}

  update() {
    this.onUpdate.emit(this.task.taskId);
  }

  remove() {
    this.onDelete.emit(this.task.taskId);
  }

  controlTask(id: string, lastWorkStartAt: string) {
    const update = this.update;
    if (lastWorkStartAt == null) {
      this.taskService.startTask(id).subscribe(_ => update());
    } else {
      this.taskService.stopTask(id).subscribe(_ => update());
    }
  }

  finishTask(id: string) {
    const remove = this.remove;
    this.taskService.finishTask(id).subscribe(_ => remove());
  }

  getProgressPercent(task: Task) {
    return (100 * (task.workedTime / task.expDuration)).toFixed(2) + '%';
  }

  getPerformancePercent(task: Task) {
    const progress = task.workedTime / task.expDuration;
    let msg = '';

    if (progress > 1) {
      msg = progress.toFixed(2) + 'x slower than expected';
    } else if (task.workedTime === 0) {
      msg = '∞ faster than expected';
    } else {
      msg = ((1 / progress)).toFixed(2) + 'x faster than expected';
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
