export const url = 'https://learnlangapp1.herokuapp.com';
export const GAME_1 = 'AUDIO CHALLENGE';
export const GAME_2 = 'SPRINT';
export const LOCAL_KEY = 'userObject';
export const PLAY_PREFIX = 'PLAY ';
export const SLASH = '/';
export const PAGE_KEY = 'currentTextbookPage';

export enum QueryParams {
  logIn = '/signin',
  register = '/users',
  words = '/words',
  token = '/token',
  statistics = '/statistics',
  settings = '/settings',
  aggregatedWords = '/aggregatedWords',
}
export interface LoginResponse {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}
export interface User {
  name?: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  name: string;
  email: string;
  password: string;
}

export enum RouterParams {
  registration = '/authorization/registration',
  login = '/authorization',
  about = '/about',
}

export enum PageRoutes {
  registration = 'registration',
  authorization = 'authorization',
  about = 'about',
  sprint = 'sprint',
  audioChallenge = 'audio-challenge',
  statistics = 'statistics',
  textBook = 'textbook/:id',
}

export interface IWordCard {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export enum AppPages {
  Main,
  About,
  MiniGames,
  TextBook,
  DashBoard,
  Authorization,
}

export interface authorCard {
  id: number;
  firstName: string;
  secondName: string;
  photoURL: string;
  git: string;
  features: string[];
  aboutAuthor: string;
}

export interface LoginUserResponse {
  id: string;
  name: string;
  email: string;
}
export enum ShowUserStatus {
  login = 'login',
  registration = 'registration',
  statistics = 'statistics',
  update = 'update',
}

export interface UserStatistics {
  id: string;
  learnedWords: number;
}

export interface UserSettings {
  wordsPerDay: number;
  optional: {};
}

export interface UserWords {
  difficulty: 'string';
  optional: {};
}

export interface IWordsData {
  difficulty: string;
  optional: {
    attempts: number;
    success: number;
    rightGuessesInRow: number;
  };
}
export enum Difficulty {
  Hard = 'hard',
  Easy = 'easy',
}
export interface IWord {
  id: string;
  difficulty?: string;
  wordId: string;
}
