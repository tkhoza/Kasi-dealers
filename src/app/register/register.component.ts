import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { User } from '../Models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  user: User = new User();

   constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {

        this.form = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
  }

  ngOnInit() {
  }

  register() {
    const val = this.form.value;

    if (val.email && val.password && val.firstName && val.lastName) 
    {
        this.user.firstName = val.firstName.toString();
        this.user.lastName = val.lastName.toString();
        this.user.email = val.email.toString();
        this.user.password = val.password.toString();
    }

    console.log(this.user);

    // this.authService.login(this.user).subscribe(() => {
    //       console.log('User is logged in');
    //       this.router.navigateByUrl('/');
    // });
  }


}