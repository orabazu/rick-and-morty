import React, { useEffect } from "react";
import { useCharacterContext } from "../contexts/characterContext";
import { useEpisodeContext } from "../contexts/episodeContext";
import { CharacterActionTypes } from "../reducers/characterReducer";
import { EpisodeActionTypes } from "../reducers/episodeReducer";
import {
  characterService,
  CharactersParameters,
} from "../service/CharacterService";
import { EpisodeParameters, episodeService } from "../service/EpisodeService";
import CharacterCard from "./CharacterCard";
import Pagination from "./Pagination";

function Characters() {
  const [characterState, characterDispatch] = useCharacterContext();
  const [, episodeDispatch] = useEpisodeContext();

  const fetchEpisode = async (id: string, params?: EpisodeParameters) => {
    episodeDispatch({
      type: EpisodeActionTypes.SET_ISLOADING,
      payload: true,
    });

    const res = await episodeService.getEpisode(id, params).catch((error) => {
      episodeDispatch({
        type: EpisodeActionTypes.FETCH_FAILURE,
        payload: error,
      });
    });
    if (res) {
      episodeDispatch({
        type: EpisodeActionTypes.FETCH_SUCCESS,
        payload: res,
      });
    }

    episodeDispatch({
      type: EpisodeActionTypes.SET_ISLOADING,
      payload: false,
    });
  };

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
      let pagination = Array.from(Array(res.info.pages).keys())
      characterDispatch({
        type: CharacterActionTypes.FETCH_SUCCESS,
        payload: {...res, pagination}
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

  useEffect(() => {
    const episodeSet = new Map();
    characterState.characterList.forEach((c) => {
      c.episode.forEach((e) => {
        episodeSet.set(e.split("/").pop(), e);
      });
    });
    episodeSet.forEach((e, key) => {
      fetchEpisode(key as string);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterState.characterList]);

  const onPageChange = () => {
    console.log("213213");
  };

  return (
    <>
      <p className="text-8xl text-center py-6 text-pink-600 font-sunshiney">Rick and Morthy</p>
      <Pagination currentPage={1} onPageChange={onPageChange} />
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-6 pb-12">
        {characterState.isLoading
          ? <p className="text-4xl text-center py-6 text-pink-600 font-sunshiney">Loading ...</p>
          : characterState.characterList.map((character) => {
              return (
                <CharacterCard
                  key={character.id}
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
    </>
  );
}

export default Characters;
