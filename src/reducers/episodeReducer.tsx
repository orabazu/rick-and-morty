import { EpisodeResult} from "../service/EpisodeService";

export type EpisodeState = {
  isLoading: boolean;
  episodeList: {[k:string]:EpisodeResult};
  episodeListError: Error | null;
  [k:string]: string | boolean | Error | {[k:string]:EpisodeResult} | null;
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
      payload: {
        results: EpisodeResult;
      };
    }
  | { type: EpisodeActionTypes.FETCH_FAILURE; payload: Error }
  | { type: EpisodeActionTypes.SET_ISLOADING; payload: boolean }
  | { type: EpisodeActionTypes.SET_UNIQUE_EPISODE; payload: string };

const initialState: EpisodeState = {
  episodeList: {},
  episodeListError: null,
  isLoading: false,
};

const reducer = (
  state: EpisodeState,
  action: EpisodeAction
): EpisodeState => {
  switch (action.type) {
    case EpisodeActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        episodeList: {[action.payload.results.id]: {...action.payload.results}},
      };
    case EpisodeActionTypes.FETCH_FAILURE:
      return {
        ...state,
        episodeList: {},
        episodeListError: action.payload,
      };
    case EpisodeActionTypes.SET_ISLOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case EpisodeActionTypes.SET_UNIQUE_EPISODE:
      return {
        ...state,
        [action.payload]: action.payload,
      };
    default:
      return state;
  }
};

export { initialState, reducer };
