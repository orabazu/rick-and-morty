import { api } from "../lib/Api";
import { Info } from "./types";

export type CharacterResult = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type CharactersParameters = {
  page?: string
};

export type CharactersResponse = {
  info: Info;
  results: CharacterResult[]
};


class CharacterService {
  getCharacters(params?: CharactersParameters): Promise<CharactersResponse> {
    return api.get<CharactersResponse>("character", params);
  }
}

export const characterService = new CharacterService();
