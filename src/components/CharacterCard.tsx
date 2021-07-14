import React from "react";
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
    <div className="max-w-sm rounded overflow-hidden shadow-2xl bg-gray-50">
      <img className="w-full" src={image} alt="Char" />
      <div className="px-6 py-4">
        <div className="font-bold text-3xl mb-2 font-sunshiney">
          {name} ({species})
        </div>
        <p className="text-gray-700 text-base font-yomogi">
          <span className="font-semibold ">Location:</span> {location} 
        </p>
        <p className="text-gray-700 text-base font-yomogi">
        <span className="font-semibold ">Origin:</span> {origin}
        </p>
      </div>
      <div className="text-base	px-6 font-sunshiney">Episodes</div>
      <div className="px-6 pt-4 pb-2 overflow-x-auto flex flex-row">
        {episodes.map((e) => (
          <CharacterCardEpisodes key={e} episode={e} />
        ))}
      </div>
    </div>
  );
};

export default CharacterCard;
