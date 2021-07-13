import { CharacterResult } from "../service/CharacterService";

export type CharacterState = {
  isLoading: boolean;
  characterList: CharacterResult[];
  characterListError: Error | null;
  characterTotalCount: number | null;
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
        data: CharacterResult[];
        totalCount: number;
      };
    }
  | { type: CharacterActionTypes.FETCH_FAILURE; payload: Error }
  | { type: CharacterActionTypes.SET_ISLOADING; payload: boolean };

const initialState: CharacterState = {
  characterList: [],
  characterListError: null,
  isLoading: false,
  characterTotalCount: null,
};

const reducer = (
  state: CharacterState,
  action: CharacterAction
): CharacterState => {
  switch (action.type) {
    case CharacterActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        characterList: action.payload.data,
        characterTotalCount: action.payload.totalCount,
      };
    case CharacterActionTypes.FETCH_FAILURE:
      return {
        ...state,
        characterList: [],
        characterTotalCount: null,
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
