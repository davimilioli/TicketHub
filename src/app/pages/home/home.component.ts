import { Component } from '@angular/core';
import { TicketService } from '../../services/ticket/ticket.service';
import { Ticket, TicketList } from '../../Types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  ticketResult: TicketList = { total: 0, page: 1, pageSize: 12, tickets: [] };
  errorMessage: string = '';

  constructor(private ticketService: TicketService, private router: Router){}

  ngOnInit(){

    this.ticketService.getAll().subscribe(
      result => {
        this.ticketResult = result
        console.log(this.ticketResult);
      }, 
      error => {
        this.errorMessage = error
        console.log(error);
      }
    );
  };

  redirectTicket(ticket: Ticket): void{
    this.router.navigate(['/detalhe/', ticket.id])
  }
}
