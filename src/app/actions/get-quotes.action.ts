import { Action } from "@ngrx/store";
import { GetQuotes } from "../shared/models/getQuotes.model";

export const Update_GetQuotes = "GetQuotes Update";
export const Remove_GetQuotes = "GetQuotes Remove";
export const Add_GetQuotes = "GetQuotes ADD Request";

export class UpdateGetQuotes implements Action {
  readonly type = Update_GetQuotes;
  constructor(public payload: GetQuotes) {}
}
export class AddGetQuotes implements Action {
  readonly type = Add_GetQuotes;
  constructor(public payload: GetQuotes) {}
}
export class RemoveGetQuotes implements Action {
  readonly type = Remove_GetQuotes;
  constructor(public payload: number) {}
}

export type Actions = UpdateGetQuotes | RemoveGetQuotes | AddGetQuotes;
