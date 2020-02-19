import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { catchError, exhaustMap, map } from "rxjs/operators";
import * as BasicInfoActions from "./../actions/basicInfo.action";
import { BasicInfoService } from "../shared/services/basic-info.service";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";

@Injectable()
export class ChacheEffect {
  basicInfo$ = createEffect(() =>
    this.actions$.pipe(ofType("[Movies Page] Load Movies"))
  );
  constructor(private actions$: Actions, private store: Store<AppState>) {}
}
