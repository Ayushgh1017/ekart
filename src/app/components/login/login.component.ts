import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-module/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(private authService: AuthService, private router:Router) { }

  submitForm(){
    if (this.form.invalid) {
      return;
    }
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;

    if (!username ||!password) {
      return;
    }

    this.authService.login(username, password).subscribe(success => {
      if (success) {
        this.router.navigate(['/products']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
