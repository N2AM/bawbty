import { Injectable, ErrorHandler } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { LoggerService } from "../logger/logger.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private loggerService: LoggerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        this.loggerService.logError(error);
        return throwError(error.error);
      })
    );
  }
}
