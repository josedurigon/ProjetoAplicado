import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-vertical-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vertical-menu.component.html',
  styleUrl: './vertical-menu.component.css'
})
export class VerticalMenuComponent {

  menuItems: { label: string, icon: string, route: string }[] = [
    { label: 'Dashboard', icon: 'pi pi-home', route: '/dashboard' },
    
  ];


}

