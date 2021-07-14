import React from "react";
import { useEpisodeContext } from "../contexts/episodeContext";

type Props = {
  episode: string;
};

const CharacterCardEpisodes: React.FC<Props> = ({ episode }) => {
  const [episodeState] = useEpisodeContext();

  return (
    <span
      className="inline-block bg-gray-200 rounded-full 
    px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 whitespace-nowrap font-yomogi"
    >
      {episodeState.episodeMap[episode]?.name}
    </span>
  );
};

export default CharacterCardEpisodes;
