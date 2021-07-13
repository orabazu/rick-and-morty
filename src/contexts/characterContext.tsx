/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useReducer } from "react";
import {
  CharacterAction,
  CharacterState,
  initialState,
  reducer,
} from "../reducers/characterReducer";

export type Props = {
  children: React.ReactNode;
};

type CharacterContextType =
  | [CharacterState, React.Dispatch<CharacterAction>]

//@ts-ignore
export const CharacterContext = createContext<CharacterContextType>(null);
export const CharacterContextProvider = (props: Props): JSX.Element => {
  const [characterState, characterDispacth] = useReducer(reducer, initialState);

  return (
    <CharacterContext.Provider value={[characterState, characterDispacth]}>
      {props.children}
    </CharacterContext.Provider>
  );
};

export const useCharacterContext = (): CharacterContextType =>
  useContext<CharacterContextType>(CharacterContext);
