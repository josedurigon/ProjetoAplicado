import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VerticalMenuComponent } from '../Components/vertical-menu/vertical-menu.component';
import { HeaderComponent } from '../Components/header/header.component';
import { FooterComponent } from '../Components/footer/footer.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterModule, VerticalMenuComponent, HeaderComponent, FooterComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

}
