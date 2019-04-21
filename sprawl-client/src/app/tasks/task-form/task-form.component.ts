import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from '../task';
import { TasksComponent } from '../tasks.component';
import { compileBaseDefFromMetadata } from '@angular/compiler';


@Component({
  selector: 'app-task-form',
  providers: [TasksComponent],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onCreate: EventEmitter<Task>;

  taskForm = new FormGroup({
    title: new FormControl(),
    body: new FormControl(),
    expDuration: new FormControl(),
    workedTime: new FormControl(),
    tags: new FormControl()
  });

  constructor(private router: Router, private comp: TasksComponent) { }

  ngOnInit() {
  }

  onSubmit() {
    const title = this.taskForm.value.title;
    const body = this.taskForm.value.body;
    const expDuration = this.taskForm.value.expDuration;
    const workedTime = this.taskForm.value.workedTime;
    const tagsInput = this.taskForm.value.tags;
    let tags;

    if (tagsInput == null) {
      tags = [];
    } else {
      tags = tagsInput.split(',');
    }

    if (title == null || body == null || expDuration == null || workedTime == null) {
      alert('Title, Body, Expected Duration, and Worked Time Fields Required');
      return;
    }

    if (expDuration <= 0) {
      alert('Expected Duration must be greater than 0.');
      return;
    }

    if (workedTime < 0) {
      alert('Expected Duration must be 0 or positive.');
      return;
    }

    this.comp.createTask(title, body, tags, expDuration, workedTime);

    this.router.navigate(['/main']);
  }

}
