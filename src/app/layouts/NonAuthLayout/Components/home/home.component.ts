import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // <-- corrigido aqui
})
export class HomeComponent { 

  homeItems: { label: string, icon: string, route: string }[] = [
  { label: 'Login', icon: '', route: '/login'},

  ]
}