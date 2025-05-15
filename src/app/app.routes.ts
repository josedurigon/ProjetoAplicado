import { Routes } from '@angular/router';
import { NonAuthLayoutComponent } from './layouts/NonAuthLayout/non-auth-layout/non-auth-layout.component';
import { HomeComponent } from './layouts/NonAuthLayout/Components/home/home.component';
import { LoginComponent } from './layouts/NonAuthLayout/Components/login/login.component';
import { AuthLayoutComponent } from './layouts/AuthLayout/auth-layout/auth-layout.component';
import { HomeComponentAuth } from './layouts/AuthLayout/Components/home/home.component';
import { DashboardComponent } from './layouts/AuthLayout/Components/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        component: NonAuthLayoutComponent,
        children: [
          { path: '', component: HomeComponent },
          { path: 'login', component: LoginComponent }
        ]
      },
      {
        path:'app',
        component: AuthLayoutComponent,
        children:[
            {path: '', component: HomeComponentAuth},
            { path: 'dashboard', component: DashboardComponent },
            { path: '', component: HomeComponentAuth}
        ]
      }
      

];
