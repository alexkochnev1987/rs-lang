import { Injectable } from '@angular/core';
import { LoginResponse } from 'src/app/constants';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly storage: Storage;
  constructor() {
    this.storage = window.localStorage;
  }
  get length(): number {
    return this.storage.length;
  }

  clear(): void {
    this.storage.clear();
  }

  getItem(key: string): string | null {
    const user: string | null = localStorage.getItem(key);
    return user ? JSON.parse(user) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
