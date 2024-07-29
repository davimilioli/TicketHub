import { Component } from '@angular/core';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  faChevronDown = faChevronCircleDown;
  menuOpen: boolean = false;

  openDropdown(){
    console.log('apertei')
    this.menuOpen = !this.menuOpen;
  }
}
