import { Component } from '@angular/core';
import { HomeComponent } from '../Components/home/home.component';
import { HeaderComponent } from '../Components/header/header.component';
import { FooterComponent } from '../Components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../Components/login/login.component';


@Component({
  selector: 'app-non-auth-layout',
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent, LoginComponent],
  templateUrl: './non-auth-layout.component.html',
  styleUrl: './non-auth-layout.component.css'
})
export class NonAuthLayoutComponent {

}
