import { Component } from '@angular/core';
import { Ticket } from '../../Types';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrl: './create-ticket.component.scss'
})
export class CreateTicketComponent {

  createTicket(event: Ticket){

    console.log(event)
  }

}
