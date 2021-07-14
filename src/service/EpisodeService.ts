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
};

export type EpisodeResponse = EpisodeResult;


class EpisodeService {
  getEpisode(urlParams: string, params?: EpisodeParameters): Promise<EpisodeResponse> {
    const url = urlParams ? `episode/${urlParams}`: "episode"
    return api.get<EpisodeResponse>(url, params);
  }
}

export const episodeService = new EpisodeService();
