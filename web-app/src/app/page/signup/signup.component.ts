import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  PWD_MIN_CHAR = 8;
  PWD_MAX_CHAR = 32;

  userForm: FormGroup;

  signupError: boolean;
  signupErrorMsg: string;

  isEmailUnique: boolean = true;
  isUsernameUnique: boolean = true;


  constructor(private forms: FormBuilder, private userService: UserService)
  {
    this.userForm = this.forms.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.PWD_MIN_CHAR), Validators.maxLength(this.PWD_MAX_CHAR)]],
      repassword: ['', Validators.required],
    }, {validators: this.confirmPassword});
  }

  ngOnInit()
  {
  }

  onSubmit()
  {
    this.userService.createUser(this.userForm.value)
      .subscribe(res => {
        this.signupError = res.error;
        this.signupErrorMsg = res.msg;
      });
  }

  checkForUsernameUniqueness()
  {
    let username = this.userForm.get('username').value;
    this.userService.getUserByUsername(username)
      .subscribe(user => this.isUsernameUnique = !user);
  }

  checkForEmailUniqueness()
  {
    let email = this.userForm.get('email').value;
    this.userService.getUserByEmail(email)
      .subscribe(user => this.isEmailUnique = !user);
  }

  confirmPassword(control: FormGroup)
  {
    let password = control.get('password');
    let repassword = control.get('repassword');
    return password.touched && repassword.touched && password.value !== password.value ?
      {confirmPassword: true} : null; 
  }

  errors(field: string)
  {
    let control = this.userForm.get(field);
    return control.errors && control.touched ? control.errors : null;
  }
}
