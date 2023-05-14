import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../models/register.model';
import { User } from '../models/user.model';
import { Users } from '../models/Admin-users.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) {
    this.loadToken();
    this.decodeJwt()

  }
  public loggedUserId!: string;
  public LoggedUserName !: string;
  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  public roles!: string;
  public emailUser!: string;
  private helper = new JwtHelperService();
  private apiURL = 'http://localhost:3000/auth';
  token!: string;


  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/getUserById/${id}`);
  }


  checkEmailExists(email: string): Observable<boolean> {
    const url = `${this.apiURL}/check-email-exists`;
    return this.http.post<boolean>(url, { email });
  }


  register(registerDTO: RegisterDTO): Observable<any> {
    const url = `${this.apiURL + '/register'}`;
    //console.log("url :"+url );
    //console.log("register dto" ,registerDTO);
    return this.http.post(url, registerDTO);
  }
  AddUsers(user: Users): Observable<any> {
    const url = `${this.apiURL + '/register'}`;
    console.log(" user from services ", user);
    return this.http.post(url, user);
  }

  testingapi() {
    const data = this.http.get(this.apiURL + "/test");

    return data;
  }

  login(userlog: User) {
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

  // In authService.ts
  // In authService.ts

  getLoggedInUserId(): string | null {
    if (!this.loggedUserId) {
      // Handle the case when the user is not logged in or their ID is not available
      return null;
    }
    // console.log(this.loggedUserId);
    return this.loggedUserId;
  }






  decodeJwt() {
    if (this.token == undefined) {
      return;
    }
    const decodedToken = this.helper.decodeToken(this.token);
    //console.log("decoded token ", decodedToken);
    this.roles = decodedToken.role;
    //console.log("roles ", this.roles);
    this.loggedUser = decodedToken.sub;
    this.LoggedUserName = decodedToken.username
    this.loggedUserId = decodedToken.id
    this.emailUser = decodedToken.email
    //console.log(this.loggedUserId);
  }

  // In authService.ts

  isConnected(): boolean {
    const token = this.getToken();
    return token != null && token !== '';
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
    console.log("auth services role is ", this.roles)
    if (!this.roles)
      return false;
    return this.roles.indexOf('entreprise') >= 0;
  }

  checkRole(type: string) {
    if (this.roles === type) {
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
  requestPasswordReset(emailOrUsername: string): Observable<any> {
    return this.http.post(`${this.apiURL}/request-password-reset`, { email: emailOrUsername });
  }
  resetPassword(username: string, newPassword: string, token: string): Observable<any> {
    return this.http.post(`${this.apiURL}/reset-password`, { username, newpassword: newPassword, token });
  }
  resetPasswordAdminwithUserName(username: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/reset-password-admin`, { username, newpassword: newPassword });
  }
  delteUser(id: string): Observable<Users> {
    return this.http.delete<Users>(`${this.apiURL}/DeleteUser/${id}`);
  }
  updateUser(usr: Users): Observable<Users> {
    //console.log("object from the updatee service data thisss  ", usr);
    const res = this.http.put<Users>(`${this.apiURL}/UpdateUser`, usr);
    //console.log(" result is ", res)
    return res;
  }
  getAllAdmins(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.apiURL}/getAllAdmins`);
  }
  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.apiURL}/GetAllUsers`);
  }
  getAllentreprises(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.apiURL}/getAllentreprises`);
  }
  getAllConsultants(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.apiURL}/getAllConsultants`);
  }

}
