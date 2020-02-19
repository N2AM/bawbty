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

@Injectable({
  providedIn: "root"
})
export class QuoteGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}
  quotes;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // this.store.select("quotes").subscribe((res: any) => {
    // console.log(res);
    // this.quotes =localStorage.getItem('');
    // });
    if (
      (this.quotes && this.quotes.length > 0) ||
      localStorage.getItem("quotes")
    ) {
      return true;
    }
    this.router.navigate(["/quote/insurance-forms"]);
    return false;
  }
}
