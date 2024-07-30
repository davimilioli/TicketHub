import { Component } from '@angular/core';
import { faChevronCircleDown, faUser, faHistory, faSearch, faPlus, faDashboard } from '@fortawesome/free-solid-svg-icons';

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
  faDashboard = faDashboard
  menuOpen: boolean = false;

  openDropdown(){
    console.log('apertei')
    this.menuOpen = !this.menuOpen;
  }
}
