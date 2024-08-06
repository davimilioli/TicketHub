import { Component } from '@angular/core';
import { faChevronCircleDown, faUser, faHistory, faSearch, faPlus, faDashboard, faBars, faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  faChevronDown = faChevronCircleDown;
  faUser = faUser;
  faHistory = faHistory
  faSearch = faSearch
  faPlus = faPlus;
  faBars = faBars;
  faClose = faClose
  menuOpen: boolean = false;
  searchOpen: boolean = false;

  openDropdown(){
    this.menuOpen = !this.menuOpen;
  }

  openSearch(){
    this.searchOpen = true;
  }

  closeSearch(){
    this.searchOpen = false;
  }
}
