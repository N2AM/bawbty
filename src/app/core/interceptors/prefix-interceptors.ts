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
import { AuthenticationService } from "../authentication/authentication.service";
import { HttpApiService } from "../wrapper-service/wrapper-service.service";

@Injectable()
export class PrefixInterceptor implements HttpInterceptor {
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private apiService: HttpApiService,
    private authService: AuthenticationService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = localStorage.getItem("access-token");
    // console.log(token, token ? "Bearer " + token : "");
    const modified = req.clone({
      setHeaders: {
        "Access-Control-Allow-Origin": "*",
        // "Content-Type": "application/json",
        lang: "en-US",

        Authorization: token ? "Bearer " + token : ""

        // Authorization: this.authService.getauthorizationHeaderValue()
      }
    });

    return next.handle(modified);
  }
}
