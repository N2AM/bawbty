import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthenticationInterceptor } from "./authentication.intercptor";
import { ErrorInterceptor } from "./error.interceptor";
import { PrefixInterceptor } from "./prefix-interceptors";

export const httpInterceptorsProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: PrefixInterceptor, multi: true },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true
  },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
];
