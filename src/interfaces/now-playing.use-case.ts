export interface NowPlayingResponse {
  station: Station;
  listeners: Listeners;
  live: Live;
  now_playing: NowPlaying;
  playing_next: null;
  song_history: NowPlaying[];
  is_online: boolean;
  cache: null;
}

export interface Listeners {
  total: number;
  unique: number;
  current: number;
}

export interface Live {
  is_live: boolean;
  streamer_name: string;
  broadcast_start: null;
  art: null;
}

export interface NowPlaying {
  sh_id: number;
  played_at: number;
  duration: number;
  playlist: string;
  streamer: string;
  is_request: boolean;
  song: Song;
  elapsed?: number;
  remaining?: number;
}

export interface Song {
  id: string;
  art: string;
  custom_fields: any[];
  text: string;
  artist: string;
  title: string;
  album: string;
  genre: string;
  isrc: string;
  lyrics: string;
}

export interface Station {
  id: number;
  name: string;
  shortcode: string;
  description: string;
  frontend: string;
  backend: string;
  timezone: string;
  listen_url: string;
  url: string;
  public_player_url: string;
  playlist_pls_url: string;
  playlist_m3u_url: string;
  is_public: boolean;
  mounts: Mount[];
  remotes: any[];
  hls_enabled: boolean;
  hls_is_default: boolean;
  hls_url: null;
  hls_listeners: number;
}

export interface Mount {
  id: number;
  name: string;
  url: string;
  bitrate: null;
  format: null;
  listeners: Listeners;
  path: string;
  is_default: boolean;
}
