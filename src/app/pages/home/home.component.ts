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
  ticketActives: number = 0;
  ticketInactives: number = 0;
  ticketPriority: { [key: string]: number } = {
    'Baixa': 0,
    'Normal': 0,
    'Alta': 0,
    'Urgente': 0
  }

  constructor(private ticketService: TicketService, private router: Router){}

  ngOnInit(){
    this.ticketService.getAll().subscribe(
      result => {
        this.ticketResult = result
        this.countStatus();
        this.countPriorities()
        console.log(this.ticketResult);
      }, 
      error => {
        this.errorMessage = error
        console.log(error);
      }
    );
  };

  redirectTicket(ticket: Ticket): void{
    this.router.navigate(['/ticket/', ticket.id])
  }

  countStatus(){
    this.ticketActives = this.ticketResult.tickets.filter(ticket => ticket.status === 'Ativo').length;
    this.ticketInactives = this.ticketResult.tickets.filter(ticket => ticket.status === 'Inativo').length;
  }

  countPriorities(){

    for(const priority of Object.keys(this.ticketPriority)){
      this.ticketPriority[priority] = 0;
    };

    this.ticketResult.tickets.forEach((ticket) => {
      if(this.ticketPriority.hasOwnProperty(ticket.prioridade)){
        this.ticketPriority[ticket.prioridade]++
      }
    })

    console.log(this.ticketPriority);
  }
}
