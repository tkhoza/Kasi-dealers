import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { User } from '../Models/user';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  user: User = new User(); //Calling the constructor.
  // user: User {...} => manually sets the instance's values.

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private notify: NotificationService,
              private router: Router) {

      this.form = this.fb.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
      });
  }

  ngOnInit() {
  }
  login() {
      const val = this.form.value;

    if (val.email && val.password) {
        this.user.email = val.email.toString();
        this.user.password = val.password.toString();
    }

      this.authService.login(this.user)
        .subscribe(
          (data) => {
            if(!data.user)
            {
              this.notify.error("Incorrect Username/Password");
            }
            else
            {
              this.notify.success("Successfully logged in");
              this.router.navigateByUrl('/');
            }
          });
    }
}

