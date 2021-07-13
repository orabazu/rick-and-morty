import { CharacterResult } from "../service/CharacterService";
import { Info } from "../service/types";

export type CharacterState = {
  isLoading: boolean;
  characterList: CharacterResult[];
  characterListError: Error | null;
  characterInfo: Info | null;
};

export enum CharacterActionTypes {
  FETCH_SUCCESS = "FETCH_CHARACTER_LIST_SUCCESS",
  FETCH_FAILURE = "FETCH_CHARACTER_LIST_FAILURE",
  SET_ISLOADING = "SET_ISLOADING",
}

export type CharacterAction =
  | {
      type: CharacterActionTypes.FETCH_SUCCESS;
      payload: {
        results: CharacterResult[];
        info: Info;
      };
    }
  | { type: CharacterActionTypes.FETCH_FAILURE; payload: Error }
  | { type: CharacterActionTypes.SET_ISLOADING; payload: boolean };

const initialState: CharacterState = {
  characterList: [],
  characterListError: null,
  isLoading: false,
  characterInfo: null,
};

const reducer = (
  state: CharacterState,
  action: CharacterAction
): CharacterState => {
  switch (action.type) {
    case CharacterActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        characterList: action.payload.results,
        characterInfo: action.payload.info,
      };
    case CharacterActionTypes.FETCH_FAILURE:
      return {
        ...state,
        characterList: [],
        characterInfo: null,
        characterListError: action.payload,
      };
    case CharacterActionTypes.SET_ISLOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export { initialState, reducer };
