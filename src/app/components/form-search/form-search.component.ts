import { Component, EventEmitter, Output } from '@angular/core';
import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { TicketService } from '../../services/ticket/ticket.service';
import { Ticket } from '../../Types';

@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styleUrl: './form-search.component.scss'
})
export class FormSearchComponent {
  faSearch = faSearch;
  faClose = faClose
  loading: boolean = false;
  searchTerm: string = '';
  tickets: Ticket[] = [];
  result: Ticket[] = [];
  @Output() onCloseSearch = new EventEmitter<any>();

  constructor(private ticketService: TicketService){}

  ngOnInit(){
    this.loading = true;
    this.ticketService.getAll().subscribe(
      result => {
        this.tickets = result.tickets;
        this.loading = false;
      },
      error => {
        console.log(error);
        this.loading = false;
      }
    )
  }

  closeSearch(){
    this.onCloseSearch.emit(false);
  }

  searchTicket(){
    if(this.searchTerm){
      this.loading = true;
      const result = this.tickets.filter((ticket) => {
        const titulo = ticket.titulo.toLowerCase();
        const term = this.searchTerm.toLowerCase();
        return titulo.startsWith(term);
      });

      console.log('Termo', this.searchTerm)
      console.log('Tickets: ', this.tickets)
  
      console.log('Resultado:', result);

      this.result = result;
      this.loading = false;
    } else {
      this.result = [];
    }

  }
}
