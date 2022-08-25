import authorsData from '../../../authors.json';
import { Component, Input, OnInit } from '@angular/core';
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
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  @Input()
  authors!: authorCard[];

  ngOnInit() {
    this.authors = authorsData;
  }

  getGitIcon(author: authorCard) {
    return {
      'background-image': `url('../../../assets/img/footer_git_${author.id}.svg')`,
    };
  }
}
