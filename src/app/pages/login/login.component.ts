import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;
  public loading:boolean = false;
  private auth;
  constructor(fb:FormBuilder, auth:AuthService, private router: Router) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    this.auth = auth;
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here
      console.log(values);
      this.loading = true;
      this.auth.signup(values).map(res => res.json()).subscribe(res =>{
        if( res.status == 'SUCCESS' )
        {
            console.log(res.user_data);
            this.loading = false;
            localStorage.setItem('currentUser', JSON.stringify(res.user_data))
            this.router.navigate(['/pages'], { queryParams: {}});
        }
        else
        {
            this.loading = false;
            alert(res.msg);
        }
      })
    }
  }
}
