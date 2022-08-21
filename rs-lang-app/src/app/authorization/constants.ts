export const url = 'https://learnlangapp1.herokuapp.com';
export enum QueryParams {
  logIn = '/signin',
  register = '/users',
  words = '/words',
}
export interface LoginResponse {
  message: 'string';
  token: 'string';
  refreshToken: 'string';
  userId: 'string';
  name: 'string';
}

export interface RegisterResponse {
  name: 'string';
  email: 'string';
  password: 'string';
}
