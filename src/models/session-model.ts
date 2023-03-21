import { Song } from './song-model';
import { User } from './user-model';

export interface Session {
  title: string;
  coverImageURL: string;
  url: string;
  currentSong: Song | string;
  queuedSongs: Song[];
  admin: User;
  participants: User[];
  _id: number;
}

export type sessionResponse = Omit<Session, 'currentSong'>;

export type createSessionInput = Pick<Session, 'title' | 'coverImageURL'>;

export interface CreateSessionResponse {
  msg: string;
  session: sessionResponse;
}

export interface AllSessionsResponse {
  msg: string;
  sessions: sessionResponse[];
}
