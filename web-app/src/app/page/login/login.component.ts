import { Component, OnInit } from '@angular/core';
import { UserCredentials } from '../../../../../web-api/src/user/user.model';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials: UserCredentials = { username: '', password: '' };
  loginError = false;

  constructor(public userService: UserService)
  {
  }

  ngOnInit() {
  }

  onSubmit()
  {
    this.userService.authenticateUser(this.credentials)
      .subscribe(res => this.loginError = res.error);
  }

}
