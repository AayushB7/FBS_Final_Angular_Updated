import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { SearchComponent } from './Components/search/search.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { BookingComponent } from './Components/booking/booking.component';
import { AuthGuard1 } from './Guards/auth.guard';
import { AuthGuard2 } from './Guards/signedin.guard';
import { AdminComponent } from './Components/AdminComponents/admin/admin.component';
import { AppComponent } from './app.component';
import { CreateFlightComponent } from './Components/AdminComponents/create-flight/create-flight.component';
import { RegisterAdminComponent } from './Components/AdminComponents/register-admin/register-admin.component';



const routes: Routes = [
  {path:'login',component:LoginComponent, canActivate:[AuthGuard2]},
  {path:'signup',component:SignupComponent, canActivate:[AuthGuard2]},
  {path:'search',component:SearchComponent},
  {path:'navbar',component:NavbarComponent},
  {path:'home',component:HomeComponent},
  {path:'home',component:AppComponent},
  {path:'profile',component:ProfileComponent},
  {path:'admin',component:AdminComponent},
  {path: 'booking/1', component: BookingComponent, canActivate: [AuthGuard1]},
  {path: 'create-flight', component: CreateFlightComponent},
  {path: 'register-admin', component: RegisterAdminComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
