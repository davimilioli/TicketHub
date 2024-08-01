import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../../services/ticket/ticket.service';
import { CreateLogResponse, EditTicketResponse, Ticket, TicketLog } from '../../Types';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';

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
  faTrash = faTrash;
  faPen = faPen;
  showModalExclude: boolean = false;
  showModalEdit: boolean = false;
  btnText: string = 'Salvar';

  constructor(private route: ActivatedRoute, private ticketService: TicketService, private router: Router){}

  ngOnInit(){
    const id: string = this.route.snapshot.paramMap.get('id') as string;
    this.ticketService.get(id).subscribe(
      result => {
        this.ticket = result;
        console.log(this.ticket.prazo_ate)
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
    });

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

  async submit(){
    if(this.ticketLogForm.invalid){
      return;
    } 

    const ticketFormDatas = this.ticketLogForm.value;
    console.log(ticketFormDatas)

    const data = {
      id_ticket: ticketFormDatas.id_ticket,
      usuario: ticketFormDatas.usuario,
      descricao: ticketFormDatas.descricao,
      tipo: ticketFormDatas.tipo,
    }

    if(ticketFormDatas.para){
      data.tipo = ticketFormDatas.para
    }

    await this.ticketService.createLog(data).subscribe(
      (response: CreateLogResponse) => {
        console.log('Dados enviados', response)

        const newLog: TicketLog = response.log;

        if(!this.ticket.historico){
          this.ticket.historico = [];
        }

        this.ticket.historico = [...this.ticket.historico, newLog];
        this.ticketLogForm.reset();
      },
      error => {
        console.log('Erro ao enviar dados', error)
      }
    );
  }

  async editTicket(event: Ticket){
    const historico = this.ticket.historico;

    function formatDateLocal(date: string){
      const newDate = new Date(date + 'T00:00:00');
      const timeZone = newDate.getTimezoneOffset() * 6000;
      const convertDate = new Date(newDate.getTime() + timeZone);
      return convertDate.toISOString();
    }

    const prazo_de = formatDateLocal(event.prazo_de);
    const prazo_ate = formatDateLocal(event.prazo_ate);
    console.log(prazo_ate)
  
    const ticketData = {
      id: Number(this.ticket.id),
      id_usuario: 1,
      titulo: event.titulo,
      descricao: event.descricao,
      solicitante: event.solicitante,
      prioridade: event.prioridade,
      prazo_de: prazo_de,
      prazo_ate: prazo_ate, 
      status: event.status,
    };

    await this.ticketService.update(ticketData).subscribe(
      (response: EditTicketResponse) => {

        const ticketUpdate: Ticket = {
          ...response.ticket,
          historico: historico
        }

        this.ticket = ticketUpdate;

        this.ticket = { ...this.ticket };

        this.showModalEdit = false
      },
      error => {
        console.log(error);
      }
    ) 
  }

  modalExclude(){
    this.showModalExclude = !this.showModalExclude;
  }

  modalEdit(){
    this.showModalEdit = !this.showModalEdit;
  }

  async deleteTicket(){
    const id:number = Number(this.ticket.id) ?? '';

    await this.ticketService.delete(id).subscribe(
      response => {
        this.router.navigate(['/']);
        console.log(response)
      },
      error => {
        console.log(error);
      }
    )
  }





  
}
