import React from "react";
import { EpisodeContextProvider } from "../contexts/episodeContext";
import CharacterCardEpisodes from "./CharacterCardEpisodes";

type Props = {
  image: string;
  name: string;
  species: string;
  location: string;
  origin: string;
  episodes: string[];
};

const CharacterCard: React.FC<Props> = ({
  image,
  name,
  species,
  location,
  origin,
  episodes,
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-green-200">
      <img className="w-full" src={image} alt="Mountain" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          {name} ({species})
        </div>
        <p className="text-gray-700 text-base">
          {location} {origin}
        </p>
      </div>
      <div className="text-base	px-6 ">Episodes</div>
      <div className="px-6 pt-4 pb-2 overflow-x-scroll flex flex-row">
        <EpisodeContextProvider>
          {episodes.map((e) => (
            <CharacterCardEpisodes episode={e} />
          ))}
        </EpisodeContextProvider>
      </div>
    </div>
  );
};

export default CharacterCard;
