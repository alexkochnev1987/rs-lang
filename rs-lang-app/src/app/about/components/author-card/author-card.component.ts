import { Component, Input, OnInit } from '@angular/core';
import authorData from '../../authors.json';

interface authorCard {
  id: number;
  firstName: string;
  secondName: string;
  photoURL: string;
  git: string;
  features: string[];
  aboutAuthor: string;
}
@Component({
  selector: 'app-author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.scss'],
})
export class AuthorCardComponent implements OnInit {
  @Input()
  authors!: authorCard[];

  ngOnInit() {
    this.authors = authorData;
  }
}
