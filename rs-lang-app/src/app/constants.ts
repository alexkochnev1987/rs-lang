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
export const TITLE_GAME_STATISTICS = 'GAME STATISTICS';
export const GAME_AUDIO_CHALLENGE_INSTRUCTIONS =
  '* USE SPACE OR ENTER TO PLAY WORD AND 1,2,3,4 TO CHOOSE RIGHT WORD';
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
export const AUDIO_CHALLENGE_ATTEMPTS = 10;
export const PAGE_KEY = 'currentTextbookPage';
export const LEVEL_KEY = 'currentLevel';
export const LEARNED_PAGE = 'YOU LEARNED ALL WORDS FROM THIS PAGE!';
export const SPRINT_TIMER = 30;
export const CORRECT_ANSWER_POINTS = 50;
export const COMBO_BONUS_GROWTH = 0.1;
export const STATISTICS_WORDS_LENGTH = 10;
export const TIMER_LINE_SECTIONS = 40;
export const FROM_HARD_TO_EASY_TIMES = 5;
export const FROM_LEARNED_TO_EASY_TIMES = 3;
export const STATISTICS_NOT_FOUND = 'Statistics not found';
export const ACTIVATE_LOAD_WORDS_LEFT = 5;
export const KEYPRESS_TIMEOUT = 200;

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
  main = '/',
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
export enum GameSound {
  success = 'assets/mp3/success.mp3',
  failed = 'assets/mp3/failed.mp3',
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
  errorLogin = 'error login',
  errorRegistration = 'registration error',
  success = 'success',
}

export interface UserStatistics {
  id: string;
  learnedWords: number;
  optional: {
    sprint?: {
      today: GameOptions;
      allTime: GameOptions;
    };
    audioChallenge?: {
      today: GameOptions;
      allTime: GameOptions;
    };
  };
}

export interface UserSettings {
  wordsPerDay: number;
  optional: {};
}

export interface UserWords {
  difficulty: Difficulty;
  optional: {};
}

export interface IWordsData {
  difficulty: string;
  optional: {
    attempts?: number;
    success?: number;
    rightGuessesInRow?: number;
    dateEasy?: number;
    dateFirstTime?: number;
  };
  id?: string;
  wordId?: string;
}
export enum Difficulty {
  Hard = 'hard',
  Easy = 'easy',
  Learned = 'learning',
}

export interface IWord {
  id: string;
  difficulty?: string;
  wordId: string;
  optional?: {
    attempts?: number;
    success?: number;
    rightGuessesInRow?: number;
    dateEasy?: number;
    dateFirstTime?: number;
  };
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
  date?: number;
}
export interface GameStatistics {
  learnedWords: number;
  optional: {
    [x: string]: any;
    sprint?: {
      today: GameOptions;
      allTime: GameOptions;
    };
    audioChallenge?: {
      today: GameOptions;
      allTime: GameOptions;
    };
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

export interface IAudioChallengeStatistics {
  word: IWordCard;
  success: boolean;
}

export enum KeyCode {
  RIGHT_ARROW = 'ArrowRight',
  LEFT_ARROW = 'ArrowLeft',
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

export enum Games {
  Sprint = 'sprint',
  AudioChallenge = 'audioChallenge',
}
export interface IServiceData {
  game: Games;
  gameStats: ISprintStats[];
  longestCombo: number;
}
export interface OneGameStatistics {
  today: GameOptions;
  allTime: GameOptions;
}

export interface FilterWordsByDate {
  date: string;
  words: IWord[];
  easyWords: IWord[];
}

export interface UserWordsWithTranscription {
  userWord: IWord;
  word: IWordCard;
}
export interface aggregatedWords {
  _id: string;
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
  userWord: {
    difficulty: Difficulty;
    optional?: {
      attempts: number;
      success: number;
      rightGuessesInRow: number;
    };
  };
}

export interface aggregatedResponse {
  paginatedResults: aggregatedWords[];
  totalCount: any[];
}
