import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth-module/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {

  userName:string = '';
  constructor(private authService:AuthService, private router:Router) {}

  ngOnInit() {
    this.getInfo();
    console.log(this.userName);
  }
  getInfo(){
    this.authService.getUsername().subscribe(name=>{
      this.userName = name
    });
  }
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
