import * as PolicyActions from "./../actions/quote-policy.action";
import { Policy } from "../shared/models/policy.model";

export function policyReducer(state: Policy, action: PolicyActions.Actions) {
  switch (action.type) {
    case PolicyActions.Update_Policy:
      return action.payload;
    default:
      return state;
  }
}
