import React, { useEffect } from "react";
import { useCharacterContext } from "../contexts/characterContext";
import { useEpisodeContext } from "../contexts/episodeContext";
import { CharacterActionTypes } from "../reducers/characterReducer";
import { EpisodeActionTypes } from "../reducers/episodeReducer";
import { characterService } from "../service/CharacterService";
import { EpisodeParameters, episodeService } from "../service/EpisodeService";
import CharacterCard from "./CharacterCard";
import Pagination, { Direction } from "./Pagination";

function Characters() {
  const [characterState, characterDispatch] = useCharacterContext();
  const [episodeState, episodeDispatch] = useEpisodeContext();

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

  const fetchCharacterList = async (params?: string) => {
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

  useEffect(() => {
    const episodeSet = new Map();

    characterState.characterList.forEach((c) => {
      c.episode.forEach((e) => {
        episodeSet.set(e.split("/").pop(), e);
      });
    });
    episodeSet.forEach((e, key) => {
      if (!episodeState.episodeMap[e]) {
        fetchEpisode(key as string);
      }
    });
  }, [characterState.characterList]);

  const onPageChange = (direction: Direction) => {
    let page;
    if (direction === Direction.LEFT && characterState.characterInfo?.prev) {
      page = characterState.characterInfo?.prev.split("page=")[1];
    } else if (
      direction === Direction.RIGHT &&
      characterState.characterInfo?.next
    ) {
      page = characterState.characterInfo?.next.split("page=")[1];
    } else if (
      (direction === Direction.LEFT && !characterState.characterInfo?.prev) ||
      (direction === Direction.RIGHT && !characterState.characterInfo?.next)
    ) {
      return
    }
      fetchCharacterList(`page=${page}`);
  };

  return (
    <>
      <p className="text-8xl text-center py-6 text-pink-600 font-sunshiney">
        Rick and Morty
      </p>
      <Pagination currentPage={1} onPageChange={onPageChange} />
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-6 pb-12">
        {characterState.isLoading ? (
          <p className="text-4xl text-center py-6 text-pink-600 font-sunshiney">
            Loading ...
          </p>
        ) : (
          characterState.characterList.map((character) => {
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
          })
        )}
      </div>
    </>
  );
}

export default Characters;
