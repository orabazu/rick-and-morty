import React, { useEffect } from "react";
import { useCharacterContext } from "../contexts/characterContext";
import { CharacterActionTypes } from "../reducers/characterReducer";
import {
  characterService,
  CharactersParameters,
} from "../service/CharacterService";
import CharacterCard from "./CharacterCard";

function Characters() {
  const [characterState, characterDispatch] = useCharacterContext();

  const fetchCharacterList = async (params?: CharactersParameters) => {
    characterDispatch({
      type: CharacterActionTypes.SET_ISLOADING,
      payload: true,
    });

    const res = await characterService.getCharacters(params).catch((error) => {
      characterDispatch({
        type: CharacterActionTypes.FETCH_FAILURE,
        payload: error,
      });
    });
    if (res) {
      characterDispatch({
        type: CharacterActionTypes.FETCH_SUCCESS,
        payload: res,
      });
    }

    characterDispatch({
      type: CharacterActionTypes.SET_ISLOADING,
      payload: false,
    });
  };

  useEffect(() => {
    fetchCharacterList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6">
      {characterState.characterList.map((character) => {
        return (
          <CharacterCard
            image={character.image}
            name={character.name}
            species={character.species}
            location={character.location.name}
            origin={character.origin.name}
            episodes={character.episode}
          />
        );
      })}
    </div>
  );
}

export default Characters;
