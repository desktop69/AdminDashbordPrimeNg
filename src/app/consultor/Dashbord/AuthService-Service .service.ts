import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private router: Router, private http: HttpClient) { }

  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  public roles!: string[];
  private helper = new JwtHelperService();
  apiURL: string = 'localhost:3000/auth';
  token!: string;

  testingapi(){
    const data = this.http.get(this.apiURL+ "/test");
   
    return data;
  }

  login(userlog : User) {
    return this.http.post<any>('http://localhost:3000/auth/login', userlog);
  }

  // login(user: User) {
  //   let jwt = this.getToken();
  //   jwt = "Bearer " + jwt;
  //   let httpHeaders = new HttpHeaders({ "Authorization": jwt })
  //   return this.http.post<User>(this.apiURL + '/login', user, { observe: 'response' });
  // }
  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJwt();
  }
  decodeJwt() {
    if (this.token == undefined) {
      return;
    }
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
  }

  loadToken() {
    this.token = localStorage.getItem('jwt')!;
    this.decodeJwt();
  }

  getToken(): string {
    return this.token;
  }

  isAdmin(): Boolean {
    if (!this.roles)
      return false;
    return this.roles.indexOf('ADMIN') >= 0;
  }

  logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token = undefined!;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }


  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
    //this.getUserRoles(login);
  }


  isTokenExpired(): Boolean {
    return this.helper.isTokenExpired(this.token);
  }




}
