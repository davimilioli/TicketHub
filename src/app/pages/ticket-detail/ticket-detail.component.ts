import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../../services/ticket/ticket.service';
import { Ticket, TicketLog } from '../../Types';
import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrl: './ticket-detail.component.scss'
})
export class TicketDetailComponent {
  ticket!: Ticket;
  typeInteraction: string[] = ['Mensagem', 'Entrega Final', 'Altera Responsabilidade'];
  showUser: boolean = false;
  ticketLogData: TicketLog | null = null;
  ticketLogForm!: FormGroup 
  constructor(private route: ActivatedRoute, private ticketService: TicketService){}

  ngOnInit(){
    const id: string = this.route.snapshot.paramMap.get('id') as string;
    this.ticketService.get(id).subscribe(
      result => {
        this.ticket = result;
        console.log(result)
      },
      error => {
        console.log(error);
      }
    );

    this.ticketLogForm = new FormGroup({
      id_ticket: new FormControl(id),
      usuario: new FormControl('Davi'),
      descricao: new FormControl(this.ticketLogData ? this.ticketLogData.descricao : '', [Validators.required]),
      tipo: new FormControl(this.ticketLogData ? this.ticketLogData.tipo : 'Mensagem', [Validators.required]),
    })
    
  }

  get descricao(){
    return this.ticketLogForm.get('descricao')!
  }

  get tipo(){
    return this.ticketLogForm.get('tipo')!
  }

  interaction(event: any): void{
    const data: string = event.target.value;

    if(data == 'Altera Responsabilidade'){
      this.showUser = true;

      if(!this.ticketLogForm.get('para')){
        this.ticketLogForm.addControl('para', new FormControl(this.ticketLogData ? this.ticketLogData.para : ''));
      }
    } else {
      this.showUser = false;
      if (this.ticketLogForm.get('para')) {
        this.ticketLogForm.removeControl('para');
      }
    }
  }

  submit(){
    console.log(this.ticketLogForm.value)
  }
}
