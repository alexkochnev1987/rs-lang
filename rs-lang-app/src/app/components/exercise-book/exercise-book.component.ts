import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-exercise-book',
  templateUrl: './exercise-book.component.html',
  styleUrls: ['./exercise-book.component.scss'],
})
export class ExerciseBookComponent {
  id: number | undefined;
  private subscription: Subscription;
  constructor(private activatedRoute: ActivatedRoute) {
    this.subscription = activatedRoute.params.subscribe(
      params => (this.id = params['id'])
    );
  }
}
