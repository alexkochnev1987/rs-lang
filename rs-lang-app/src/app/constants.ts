export const url = 'https://learnlangapp1.herokuapp.com';
export const GAME_1 = 'AUDIO CHALLENGE';
export const GAME_2 = 'SPRINT';
export const BUTTON_RESTART = 'RESTART';
export const BUTTON_START = 'START';
export const BUTTON_CANCEL = 'CANCEL';
export const BUTTON_LEAVE = 'LEAVE';
export const LOCAL_KEY = 'userObject';
export const PLAY_PREFIX = 'PLAY ';
export const SLASH = '/';
export const LEVELS_COLORS: LevelColor[] = [
  { id: 1, color: '#88E564' },
  { id: 2, color: '#45DEC3' },
  { id: 3, color: '#64C6E5' },
  { id: 4, color: '#508BE4' },
  { id: 5, color: '#AC64E5' },
  { id: 6, color: '#E564B9' },
  { id: 7, color: '#EB4949' },
];
export const WORDS_ON_PAGE = 20;
export const PAGES_ON_LEVEL = 30;
export const PAGE_KEY = 'currentTextbookPage';
export const LEVEL_KEY = 'currentLevel';
export const LEARNED_PAGE = 'YOU LEARNED ALL WORDS FROM THIS PAGE!';
export const SPRINT_TIMER = 30;
export const CORRECT_ANSWER_POINTS = 50;
export const COMBO_BONUS_GROWTH = 0.1;
export const STATISTICS_WORDS_LENGTH = 10;
export const TIMER_LINE_SECTIONS = 40;

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
  audioChallenge = 'audio-challenge/:level/:page',
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
export enum gameLevelsAmount {
  userNotLogged = 6,
  userIsLogged,
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
  difficulty: string;
  optional: {};
}

export interface IWordsData {
  difficulty: Difficulty;
  optional: {
    attempts: number;
    success: number;
    rightGuessesInRow: number;
    date: number;
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
  optional?: {};
}
export interface UserWordsResponse {
  id: string;
  difficulty: string;
  optional?: {};
  wordId: string;
}

export interface DayMonthYear {
  day: number;
  month: number;
  year: number;
}
export type LevelColor = {
  id: number;
  color: string;
};

export interface GameOptions {
  attempts: number;
  success: number;
  rightGuessesInRow: number;
}

export interface GameStatistics {
  learnedWords: 0;
  optional: {
    sprint: GameOptions;
    audioChallenge: GameOptions;
  };
}

export interface IGuessButton {
  id: string;
  word: string;
}
export interface ISprintStats {
  id: string;
  word: string;
  audio: string;
  transcription: string;
  wordTranslate: string;
  success: boolean;
}

export enum StatisticsState {
  allTime = 'allTime',
  today = 'today',
  sprint = 'sprint',
  audio = 'audio',
}

export const StatisticsStateObject = {
  allTime: 'allTime',
  today: 'today',
  sprint: 'sprint',
  audio: 'audio',
};
