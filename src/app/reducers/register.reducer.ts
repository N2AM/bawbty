import * as RegisterActions from "./../actions/register.action";

export function registerReducer(state: any, action: RegisterActions.Actions) {
  switch (action.type) {
    case RegisterActions.Update_register:
      return action.payload;
    case RegisterActions.Remove_register:
      return {};
    default:
      return state;
  }
}
