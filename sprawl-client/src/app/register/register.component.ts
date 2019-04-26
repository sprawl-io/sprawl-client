import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  createUserForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl('')
  });

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {

    const username = this.createUserForm.value.username;
    const password = this.createUserForm.value.password;
    const name = this.createUserForm.value.name;
    const email = this.createUserForm.value.email;

    this.userService.register(username, password, name, email).subscribe((succ) => {
      if (succ) {
        this.router.navigate(['/login']);
      }
    });

    // this.userService.login(username, password).subscribe((succ) => {
    //   if (succ) {
    //     this.router.navigate(['/main']);
    //   }
    // });

    return false;
  }

}
