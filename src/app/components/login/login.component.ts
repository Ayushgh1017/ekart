import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-module/auth.service';
import { IRequest } from 'src/app/models/IRequest';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(12)]),
  });

  constructor(private authService: AuthService, private router:Router) { }

  submitForm(){
    if (this.form.invalid) {
      return;
    }
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;

    let req: IRequest;

    if (!username ||!password) {
      return;
    }

    req = {
      username: username,
      password: password
    }
    this.authService.login(req).subscribe(success => {
      if (success) {
        this.router.navigate(['/products']);
        
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
