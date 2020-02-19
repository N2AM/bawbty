import { Action } from "@ngrx/store";
import { Quote } from "../shared/models/quote.model";

export const Update_Quotes = "Quotes Update";
export const Add_Quotes = "Quotes Add";
export const Remove_Quotes = "Quotes Remove";

export class UpdateQuotes implements Action {
  readonly type = Update_Quotes;
  constructor(public payload: Quote) {}
}
export class AddQuotes implements Action {
  readonly type = Add_Quotes;
  constructor(public payload: Quote) {}
}
export class RemoveQuotes implements Action {
  readonly type = Remove_Quotes;
  constructor(public payload: number) {}
}

export type Actions = UpdateQuotes | RemoveQuotes | AddQuotes;
