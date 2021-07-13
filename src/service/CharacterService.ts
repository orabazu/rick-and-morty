import { api } from "../lib/Api";

export type Info = {
  count: number;
  pages: number;
  next: string;
  prev: string;
};

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
  page: string
};

export type CharactersResponse = {
  info: Info;
  results: CharacterResult[]
};


class CharacterService {
  getCharacters(params?: CharactersParameters): Promise<CharactersResponse> {
    return api.get<CharactersResponse>("characters", params);
  }
}

export const characterService = new CharacterService();
