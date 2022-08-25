import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShowRegistrationService {
  private state = false;

  getState() {
    return this.state;
  }

  setState(state: boolean) {
    this.state = state;
  }
}
