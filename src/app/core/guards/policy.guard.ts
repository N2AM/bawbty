import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AppState } from "src/app/app.state";
import { Store } from "@ngrx/store";
import { Policy } from "src/app/shared/models/policy.model";
import * as _ from "lodash";
@Injectable({
  providedIn: "root"
})
export class PolicyGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}
  policy;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // this.store.select("policy").subscribe((res: Policy) => {
    //   console.log(!_.isEmpty(this.policy));
    //   this.policy = res;
    // // });
    // this.policy = JSON.parse(localStorage.getItem("policy"));
    if (
      localStorage.getItem("policyId") &&
      localStorage.getItem("x_correlation_id")
    ) {
      return true;
    }
    this.router.navigate(["/auth/login"]);
    return false;
  }
}
