import { Action, ActionReducer } from "@ngrx/store";

function setSavedState(state: any, localStorageKey: string) {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
}
function getSavedState(localStorageKey: string): any {
  return JSON.parse(localStorage.getItem(localStorageKey));
}
// the keys from state which we'd like to save.
export const stateKeys = ["basicInfo"];
// the key for the local storage.
export const localStorageKey = "__app_storage__";
export function storageMetaReducer<S, A extends Action = Action>(
  saveKeys: string[],
  localStorageKey: string
) {
  {
    let onInit = true; // after load/refresh…
    return function(reducer: ActionReducer<S, A>) {
      return function(state: S, action: A): S {
        // get the next state.
        const nextState = reducer(state, action);
        // init the application state.
        if (onInit) {
          onInit = false;
          const savedState = getSavedState(localStorageKey);
          return savedState;
        }

        // save the next state to the application storage.
        const stateToSave = { nextState, saveKeys };
        setSavedState(stateToSave, localStorageKey);

        return nextState;
      };
    };
  }
}
