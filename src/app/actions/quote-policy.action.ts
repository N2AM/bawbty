import { Action } from "@ngrx/store";
import { Policy } from "../shared/models/policy.model";

export const Update_Policy = "Policy Update";
export const Remove_Policy = "Policy Remove";

export class UpdatePolicy implements Action {
  readonly type = Update_Policy;
  constructor(public payload: any) {}
}
export class RemovePolicy implements Action {
  readonly type = Remove_Policy;
  constructor(public payload: number) {}
}

export type Actions = UpdatePolicy | RemovePolicy;
