import React, { useEffect } from "react";
import { useEpisodeContext } from "../contexts/episodeContext";
import { EpisodeActionTypes } from "../reducers/episodeReducer";

type Props = {
  episode: string;
};

const CharacterCardEpisodes: React.FC<Props> = ({ episode }) => {
  const [episodeState, episodeDispatch] = useEpisodeContext()
  useEffect(()=>{
    if(!episodeState[episode]){
      console.log('notFound', episode)
      episodeDispatch({
        type: EpisodeActionTypes.SET_UNIQUE_EPISODE,
        payload: episode,
      });
    }
  }, [episode])
  return (
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
      #{episode}
    </span>
  );
};

export default CharacterCardEpisodes;
