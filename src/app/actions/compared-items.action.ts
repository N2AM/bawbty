import { Action } from "@ngrx/store";
import { QuoteModel } from "../shared/models/quoteModel.model";

export const Add_ComparedItems = "[ComparedItem] Add";
export const Remove_ComparedItems = "[ComparedItem] Remove";
export const Update_ComparedItems = "[ComparedItem] Update";
export const Remove_all_ComparedItems = "[ComparedItem] RemoveAll";

export class AddComparedItems implements Action {
  readonly type = Add_ComparedItems;
  constructor(public payload: any) {}
}
export class RemoveComparedItems implements Action {
  readonly type = Remove_ComparedItems;
  constructor(public payload: any) {}
}
export class RemoveAllComparedItems implements Action {
  readonly type = Remove_all_ComparedItems;
  constructor() {}
}
export class UpdateComparedItems implements Action {
  readonly type = Update_ComparedItems;
  constructor(public payload: any) {}
}

export type Actions =
  | AddComparedItems
  | RemoveComparedItems
  | UpdateComparedItems
  | RemoveAllComparedItems;
