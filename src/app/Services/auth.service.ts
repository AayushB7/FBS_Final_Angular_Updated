import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileModel, BookingDto } from 'src/app/Models/ProfileModel';
import jwt_decode from "jwt-decode";
import {JwtHelperService} from '@auth0/angular-jwt'
// import { TokenApiModel } from '../models/token-api.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // signOut() {
  //   throw new Error('Method not implemented.');
  // }

  private baseUrl:string = "https://localhost:7176/api/"
  private searchUrl:string = "https://localhost:7176/"

  private userPayload:any;

  constructor(private http : HttpClient,  private router: Router) {
    this.userPayload = this.decodedToken();
   }

  signup(userObj:any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}Authenticate/register`,userObj)
  }

  signupadmin(userObj:any): Observable<any>{
    const headers = this.getAuthorizationHeaders();
    return this.http.post<any>(`${this.baseUrl}Authenticate/register-admin`,userObj,{headers})
  }
  login(loginObj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}Authenticate/login`, loginObj);
  }

  search(searchObj: any): Observable<any[]> {
    const headers = this.getAuthorizationHeaders();
    const params = { ...searchObj }; // You can modify this if needed
    return this.http.get<any[]>(`${this.searchUrl}Search`, { headers, params });
  }

  
  booking(flightId: number, bookObj: any): Observable<any> {
    const headers = this.getAuthorizationHeaders();
    return this.http.post<any>(`${this.baseUrl}Booking/1`, bookObj, { headers });
  }

  getUserWithBookings(): Observable<ProfileModel> {
    const headers = this.getAuthorizationHeaders();
    return this.http.get<ProfileModel>(`${this.baseUrl}User/bookings`,{headers});
  }

  // booking(bookObj:any, id: number): Observable<any> {
  //   const headers = this.getAuthorizationHeaders();
  //   return this.http.post<any>(`${this.baseUrl}Booking/id?id=${id}`, bookObj, {headers});
  // }

  setToken(token:string){
    localStorage.setItem("token", token);
  }

  getToken(){
    return localStorage.getItem("token");
  }

  getAuthorizationHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken()}`
    });
  }

  isLoggedIn():boolean{
    return (!!localStorage.getItem("token")); // 2 exclamation marks to convert string to boolean
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }

  // getfullNameFromToken(){
  //   if(this.userPayload)
  //   return this.userPayload.name;
  // }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }

  // renewToken(tokenApi : TokenApiModel){
  //   return this.http.post<any>(`${this.baseUrl}refresh`, tokenApi)
  // }


  isAdminLoggedIn():boolean{
    return (!!localStorage.getItem("token")); // 2 exclamation marks to convert string to boolean
  }
  

  signOut(){
    localStorage.clear();
    // Swal.fire({
    //   title: 'Success!',
    //   text: "Logout Success!",
    //   icon: 'success',
    //   confirmButtonText: 'Ok'
    // });
    this.router.navigate(['login']);
  }


  getFlightById(id:number){
    return this.http.get(`${this.baseUrl}AirlineAuthority/id?id=${id}`);
  }

}
