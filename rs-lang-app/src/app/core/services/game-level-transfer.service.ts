import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameLevelTransferService {
  public gamePageLevel: number[] = [];
  constructor() {}
}
