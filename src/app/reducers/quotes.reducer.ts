import * as QuotesActions from "../actions/quotes.action";
import { Quote } from "../shared/models/quote.model";

const initialState: Quote[] = [];

export function quotesReducer(
  state: Quote[] = initialState,
  action: QuotesActions.Actions
) {
  switch (action.type) {
    case QuotesActions.Add_Quotes:
      return [...state, action.payload];
    case QuotesActions.Update_Quotes:
      return action.payload;
    default:
      return state;
  }
}
