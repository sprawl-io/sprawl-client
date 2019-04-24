import { Component, OnInit } from '@angular/core';
import { Task } from './task';
import { TaskService } from '../task.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        // style({transform: 'translateX(-100%)'}),
        animate('1ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private taskService: TaskService, public router: Router) {
    this.setTasks = this.setTasks.bind(this);
    this.getTasks = this.getTasks.bind(this);
    this.createTask = this.createTask.bind(this);
    this.deleteTaskWithId = this.deleteTaskWithId.bind(this);
    this.updateTaskWithId = this.updateTaskWithId.bind(this);
  }

  ngOnInit() {
    this.taskService.getTasks().subscribe(this.setTasks);
  }

  getTasks() {
    this.taskService.getTasks();
  }

  setTasks(tasks) {
    this.tasks = tasks;
    this.tasks.forEach(e => {
      this.taskService.bindParamTask(e.taskId).subscribe(task => {
        this.updateTaskWithId(e.taskId, task);
      });
    });
  }

  deleteTaskWithId(id: string) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].taskId === id) {
        this.tasks.splice(i, 1);
        return;
      }
    }
  }

  updateTaskWithId(id: string, task: Task) {
    if (typeof task === 'undefined') {
      return;
    }

    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].taskId === id) {
        this.tasks[i] = Object.assign(this.tasks[i], task);
        return;
      }
    }
  }

  updateTask(id: string) {
    this.taskService.getParamTask(id);
  }

  createTask(title: string, body: string, tags: string[], expDuration: number, workedTime: number) {
    this.taskService
      .createTask(title, body, tags, expDuration, workedTime)
      .subscribe(res => {
        this.tasks.unshift(res);
        this.getTasks();
    });
  }
}
