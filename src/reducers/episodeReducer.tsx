import { EpisodeResult } from "../service/EpisodeService";

export type EpisodeState = {
  isLoading: boolean;
  episodeListError: Error | null;
  episodeMap:{[k: string]:EpisodeResult};
};

export enum EpisodeActionTypes {
  FETCH_SUCCESS = "FETCH_EPISODE_LIST_SUCCESS",
  FETCH_FAILURE = "FETCH_EPISODE_LIST_FAILURE",
  SET_ISLOADING = "SET_ISLOADING",
  SET_UNIQUE_EPISODE = "SET_UNIQUE_EPISODE",
}

export type EpisodeAction =
  | {
      type: EpisodeActionTypes.FETCH_SUCCESS;
      payload: EpisodeResult;
    }
  | { type: EpisodeActionTypes.FETCH_FAILURE; payload: Error }
  | { type: EpisodeActionTypes.SET_ISLOADING; payload: boolean }
  | { type: EpisodeActionTypes.SET_UNIQUE_EPISODE; payload: string };

const initialState: EpisodeState = {
  episodeListError: null,
  isLoading: false,
  episodeMap:{}
};

const reducer = (state: EpisodeState, action: EpisodeAction): EpisodeState => {
  switch (action.type) {
    case EpisodeActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        episodeMap: {...state.episodeMap, [action.payload.url]: action.payload},
      };
    case EpisodeActionTypes.FETCH_FAILURE:
      return {
        ...state,
        episodeMap:{},
        episodeListError: action.payload,
      };
    case EpisodeActionTypes.SET_ISLOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    // case EpisodeActionTypes.SET_UNIQUE_EPISODE:
    //   return {
    //     ...state,
    //     [action.payload]: action.payload,
    //   };
    default:
      return state;
  }
};

export { initialState, reducer };
