import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styleUrl: './form-search.component.scss'
})
export class FormSearchComponent {
  faSearch = faSearch;
  faClose = faClose
  @Output() onCloseSearch = new EventEmitter<any>();

  closeSearch(){
    this.onCloseSearch.emit(false);
  }
}
