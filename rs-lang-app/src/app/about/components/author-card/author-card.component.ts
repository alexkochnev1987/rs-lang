import { Component, Input, OnInit } from '@angular/core';
import authorData from '../../../authors.json';
import { authorCard } from '../../../constants';
@Component({
  selector: 'app-author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.scss'],
})
export class AuthorCardComponent implements OnInit {
  isDesktop = true;
  isTablet = false;
  isPhone = false;
  private borderColors = ['#88E564', '#FFB84D', '#D698EC', '#42BEE5'];

  @Input()
  authors!: authorCard[];

  ngOnInit() {
    this.authors = authorData;
    this.checkScreen();
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

  checkScreen() {
    if (window.visualViewport!.width >= 1280) {
      this.isDesktop = true;
      this.isTablet = false;
      this.isPhone = false;
    }
    if (
      window.visualViewport!.width < 1280 &&
      window.visualViewport!.width >= 768
    ) {
      this.isDesktop = false;
      this.isTablet = true;
      this.isPhone = false;
    }
    if (window.visualViewport!.width < 768) {
      this.isDesktop = false;
      this.isPhone = true;
      this.isTablet = false;
    }
  }
}
