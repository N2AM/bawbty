import { Action } from "@ngrx/store";

export const Update_Dashboard = "Dashboard Update";
export const Remove_Dashboard = "Dashboard Remove";

export class UpdateDashboard implements Action {
  readonly type = Update_Dashboard;
  constructor() {}
}
export class RemoveDashboard implements Action {
  readonly type = Remove_Dashboard;
  constructor(public payload: any) {}
}

export type Actions = UpdateDashboard | RemoveDashboard;
