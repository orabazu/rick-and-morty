/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useReducer } from "react";
import {
  EpisodeAction,
  EpisodeState,
  initialState,
  reducer,
} from "../reducers/episodeReducer";

export type Props = {
  children: React.ReactNode;
};

type EpisodeContextType =
  | [EpisodeState, React.Dispatch<EpisodeAction>]

//@ts-ignore
export const EpisodeContext = createContext<EpisodeContextType>(null);
export const EpisodeContextProvider = (props: Props): JSX.Element => {
  const [episodeState, episodeDispacth] = useReducer(reducer, initialState);

  return (
    <EpisodeContext.Provider value={[episodeState, episodeDispacth]}>
      {props.children}
    </EpisodeContext.Provider>
  );
};

export const useEpisodeContext = (): EpisodeContextType =>
  useContext<EpisodeContextType>(EpisodeContext);
