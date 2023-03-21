import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../models/register.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) { }

  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  public roles!: string;
  private helper = new JwtHelperService();
  private apiURL = 'http://localhost:3000/auth';
  token!: string;

  
  register(registerDTO: RegisterDTO): Observable<any> {
    const url = `${this.apiURL + '/register'}`;
    console.log("url :"+url );
    console.log("register dto" ,registerDTO);
    return this.http.post(url, registerDTO);
  }
  
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
    console.log("decoded token ",decodedToken);
    this.roles = decodedToken.role;
    console.log("roles ", this.roles);
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
    return true;
  }

  
  isConsultor(): Boolean {
    if (!this.roles)
      return false;
    return this.roles.indexOf('CONSULTOR') >= 0;
  }

  isEntreprise(): Boolean {
    if (!this.roles)
      return false;
    return this.roles.indexOf('ENTREPRISE') >= 0;
  }

  checkRole(type :string) {
    if(this.roles === type) {
      return true; 
    }
    return false;
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
