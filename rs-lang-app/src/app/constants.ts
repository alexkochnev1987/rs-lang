export const url = 'https://learnlangapp1.herokuapp.com';
export enum QueryParams {
  logIn = '/signin',
  register = '/users',
  words = '/words',
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

export enum LocalStorageKeys {
  token = 'token',
  refreshToken = 'refreshToken',
  userId = 'userId',
}
