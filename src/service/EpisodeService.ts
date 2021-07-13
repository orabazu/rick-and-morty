import { api } from "../lib/Api";

export type EpisodeResult = {
  id: number;
  name: string;
  status: string;
  air_date: string;
  episode: string;
  episodes: string[]
  url: string,
  created: string,
};

export type EpisodeParameters = {
  page?: string
};

export type EpisodeResponse = EpisodeResult;


class EpisodeService {
  getEpisode(params?: EpisodeParameters): Promise<EpisodeResponse> {
    return api.get<EpisodeResponse>("episode", params);
  }
}

export const episodeService = new EpisodeService();
