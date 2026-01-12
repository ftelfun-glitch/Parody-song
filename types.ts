export interface LyricPair {
  original: string;
  new: string;
  analysis?: string; // Optional explanation of the rhyme/tone match
}

export interface ParodyResponse {
  lyrics: LyricPair[];
  commentary?: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}