import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { isPlatformBrowser } from "@angular/common";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { HttpApiService } from "../wrapper-service/wrapper-service.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private apiService: HttpApiService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = localStorage.getItem("access-token");
    // console.log(token, token ? "Bearer " + token : "");
    if (token) {
      req = req.clone({
        setHeaders: {
          // "Access-Control-Allow-Origin": "*",
          // "Content-Type": "application/json",
          Authorization: token ? "Bearer " + token : ""
        }
      });
    }

    // return next.handle(req).pipe(
    //   catchError(error => {
    //     if (error && error.error == 401) {
    //       if (error.message == "") {
    //         let prams = {
    //           token: token,
    //           refreshtoken: localStorage.setItem("refreshToken", " ")
    //         };
    //       }
    //     }
    //     return throwError(error.error);
    //   })
    // );

    return next.handle(req);
  }
}
