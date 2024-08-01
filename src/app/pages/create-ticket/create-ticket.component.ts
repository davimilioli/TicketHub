import { Component } from '@angular/core';
import { Ticket } from '../../Types';
import { TicketService } from '../../services/ticket/ticket.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrl: './create-ticket.component.scss'
})
export class CreateTicketComponent {
  btnText: string = 'Criar'

  constructor(private ticketService: TicketService, private router: Router){}

  async createTicket(event: Ticket){
    const ticketData = {
      id_usuario: event.id_usuario,
      titulo: event.titulo,
      descricao: event.descricao,
      solicitante: event.solicitante,
      prioridade: event.prioridade,
      prazo_de: event.prazo_de,
      prazo_ate: event.prazo_ate,
      status: event.status
    };


   await this.ticketService.create(ticketData).subscribe(
      response => {
        this.router.navigate(['/']);
      },
      error => {
        console.log('Erro ao enviar dados', error);
      }
    ) 
  }

}
