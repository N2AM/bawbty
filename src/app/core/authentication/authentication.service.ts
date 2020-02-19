import { Injectable } from "@angular/core";
import { UserManager, UserManagerSettings, User } from "oidc-client";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpApiService } from "../wrapper-service/wrapper-service.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();
  isAuth = new BehaviorSubject(null);
  private manager = new UserManager(getClientSettings());
  private user: User | null;

  constructor(private api: HttpApiService) {
    this.manager.getUser().then(user => {
      this.user = user;
      // console.log(this.user);
      this._authNavStatusSource.next(this.isAuthenticated());
    });
  }

  login() {
    return this.manager.signinRedirect();
  }
  getClaims(): any {
    return this.user.profile;
  }
  async completeAuthentication() {
    this.user = await this.manager.signinRedirectCallback();
    this._authNavStatusSource.next(this.isAuthenticated());
    return this.manager.signinRedirectCallback().then(user => {
      this.user = user;
    });
  }

  isAuthenticated(): boolean {
    return this.user != null && !this.user.expired;
  }

  getauthorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  get name(): string {
    return this.user != null ? this.user.profile.name : "";
  }

  // signout() {
  //   this.manager.signoutRedirect();
  // }
  signOut(): Observable<any> {
    return this.api.post(environment.apiUrl + "Account/Users/Signout", []);
  }
  async completeSignOut() {
    await this.manager.signoutRedirectCallback();
    this._authNavStatusSource.next(false);
  }

  checkuseremail(email): Observable<any> {
    let mail = { email: email };
    return this.api.post(
      environment.apiUrl + "Account/Users/checkuseremail",
      mail
    );
  }
  checkuserPhone(phone): Observable<any> {
    let phoneNumber = { phoneNumber: "+966" + phone };

    return this.api.post(
      environment.apiUrl + "Account/Users/checkuserphone",
      phoneNumber
    );
  }
  register(userData): Observable<any> {
    let data = {
      fullName: userData.fullName.trim(),
      email: userData.email,
      password: userData.password,
      phoneNumber: "+966" + userData.phoneNumber
    };
    return this.api.post(environment.apiUrl + "Account/Users/register", data);
  }
  loginbyemail(data) {
    let userData = {
      email: data.email,
      password: data.password,
      clientId: "Bawbty.Web",
      clientSecret: "Web@Passw0rd",
      clientScope: "IntegrationService InsurerQuote.API UserManagement.API"
    };
    return this.api.post(environment.apiUrl + "Account/Users/Signin", userData);
  }
  forgetPasswordsendMail(mail) {
    return this.api.post(
      environment.apiUrl + "Account/Users/forgetpassword",
      mail
    );
  }
  resetPassword(data) {
    // console.log(data);
    return this.api.post(
      environment.apiUrl + "Account/Users/resetpassword",
      data
    );
  }
  changePassword(data) {
    let req = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword
    };
    return this.api.post(
      environment.apiUrl + "Account/Users/changepassword",
      req
    );
  }
  resendCode(number) {
    const data = {
      phoneNumber: number
    };
    return this.api.post(environment.apiUrl + "Account/Users/ResendCode", data);
  }
  verifySms(email, code) {
    const data = {
      code: code,
      // email: email,
      PhoneNumber: localStorage.getItem("phone")
    };
    return this.api.post(environment.apiUrl + "Account/Users/VerifySMS", data);
  }
}

export function getClientSettings(): UserManagerSettings {
  return {
    authority: "https://somaya-ibrahim.itis.local:6004/",
    client_id: "jsApp",
    redirect_uri: "https://nouran-mohamed.itis.local:8021/signin-oidc",
    post_logout_redirect_uri:
      "https://nouran-mohamed.itis.local:8021/signout-callback-oidc",
    response_type: "id_token token",
    scope: "openid profile offline_access api1 roles",
    filterProtocolClaims: true,
    loadUserInfo: true
  };
}
