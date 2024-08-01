import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Ticket } from '../../Types';

@Component({
  selector: 'app-form-ticket',
  templateUrl: './form-ticket.component.html',
  styleUrl: './form-ticket.component.scss'
})
export class FormTicketComponent {
  @Output() onSubmit = new EventEmitter<Ticket>();
  prioridades: string[] = ['Baixa', 'Normal', 'Alta', 'Urgente'];
  status: string[] = ['Ativo', 'Inativo']
  @Input() ticketFormData: Ticket | null = null;
  @Input() btnText!: string;
  ticketForm!: FormGroup

  ngOnInit(){
    this.ticketForm = new FormGroup({
      id: new FormControl(this.ticketFormData ? this.ticketFormData.id : ''),
      id_usuario: new FormControl(this.ticketFormData ? this.ticketFormData.id_usuario : 1),
      titulo: new FormControl(this.ticketFormData ? this.ticketFormData.titulo : '', [Validators.required]),
      descricao: new FormControl(this.ticketFormData ? this.ticketFormData.descricao : '', [Validators.required]),
      solicitante: new FormControl(this.ticketFormData ? this.ticketFormData.solicitante : ''),
      prioridade: new FormControl(this.ticketFormData ? this.ticketFormData.prioridade : 'Baixa' ),
      prazo_de: new FormControl(this.ticketFormData ? this.formatDate(this.ticketFormData.prazo_de) : ''),
      prazo_ate: new FormControl(this.ticketFormData ? this.formatDate(this.ticketFormData.prazo_ate) : '', [Validators.required]),
      status: new FormControl(this.ticketFormData ? this.ticketFormData.status : 'Ativo'),
    });
  }

  get titulo(){
    return this.ticketForm.get('titulo')!;
  }

  get descricao(){
    return this.ticketForm.get('descricao')!;
  }
  
  get prazo_ate(){
    return this.ticketForm.get('prazo_ate')!;
  }

  submit(){
    if(this.ticketForm.invalid){
      return;
    }
    
    this.onSubmit.emit(this.ticketForm.value)
  }

  formatDate(data: any){
    const date = new Date(data);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
}
