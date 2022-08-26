import { Component, Input, OnInit } from '@angular/core';
import authorData from '../../../authors.json';
import { authorCard } from '../../../constants';
@Component({
  selector: 'app-author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.scss'],
})
export class AuthorCardComponent implements OnInit {
  private borderColors = ['#88E564', '#FFB84D', '#D698EC', '#42BEE5'];

  @Input()
  authors!: authorCard[];

  ngOnInit() {
    this.authors = authorData;
  }

  setAuthorPhotoStyle(author: authorCard) {
    return {
      'background-image': `url('${author.photoURL}')`,
      'border-color': `${this.borderColors[author.id]}`,
    };
  }

  getAuthorGitName(author: authorCard) {
    return author.git.match(/\w+$/);
  }
}
