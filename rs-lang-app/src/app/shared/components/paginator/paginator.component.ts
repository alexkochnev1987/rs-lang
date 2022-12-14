import { Component, Input, OnInit } from '@angular/core';
import { IWordCard, UserWordsWithTranscription } from 'src/app/constants';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  isPhone = false;

  @Input() pages: [any[]] = [[]];
  @Input() currentPage = 0;
  @Output() newItemEvent = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {
    this.checkScreen();
  }

  nextPage() {
    if (this.currentPage < this.pages.length - 1) this.currentPage++;
    this.addNewItem(this.currentPage);
  }

  prevPage() {
    if (this.currentPage > 0) this.currentPage--;
    this.addNewItem(this.currentPage);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.addNewItem(this.currentPage);
  }

  addNewItem(value: number) {
    this.newItemEvent.emit(value);
  }
  checkScreen() {
    if (window.visualViewport!.width < 768) {
      this.isPhone = true;
    }
    if (window.visualViewport!.width >= 768) {
      this.isPhone = false;
    }
  }
}
