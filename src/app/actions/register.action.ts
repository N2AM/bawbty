import { Action } from "@ngrx/store";

export const Update_register = "register Update";
export const Remove_register = "register Remove";

export class Updateregister implements Action {
  readonly type = Update_register;
  constructor(public payload: string) {}
}
export class Removeregister implements Action {
  readonly type = Remove_register;
  constructor(public payload: string) {}
}

export type Actions = Updateregister | Removeregister;
