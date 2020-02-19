import * as ComparedItemsActions from "../actions/compared-items.action";

export function comparedItemsReducer(
  state: any[] = [],
  action: ComparedItemsActions.Actions
) {
  switch (action.type) {
    case ComparedItemsActions.Add_ComparedItems:
      // console.log(state, action.payload);
      return [...state, action.payload];
    case ComparedItemsActions.Remove_ComparedItems:
      // console.log(state);
      return state.filter(
        state => state.QuoteNumber !== action.payload.QuoteNumber
      );
    case ComparedItemsActions.Remove_all_ComparedItems:
      return [];
    case ComparedItemsActions.Update_ComparedItems:
      // console.log(action.payload);

      return [
        ...state.filter(s => s.QuoteNumber !== action.payload.QuoteNumber),
        action.payload
      ];
    default:
      return state;
  }
}
