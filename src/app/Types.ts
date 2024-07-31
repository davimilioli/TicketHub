export interface Ticket{
    id?: number
    id_usuario: number
    solicitante: string
    titulo: string
    descricao: string
    prioridade: 'Baixa' | 'Normal' | 'Alta' | 'Urgente'
    prazo_de: string
    prazo_ate: string
    status: 'Ativo' | 'Inativo'
    criado_em?: string
    atualizado_em?: string
    historico?: TicketLog[]
}

export interface TicketLog{
    id?: number
    id_ticket: number
    usuario: string
    descricao: string
    tipo: 'Mensagem' | 'Entrega Final' | 'Altera Responsabilidade'
    para?: string
    criado_em?: string
    atualizado_em?: string
}

export interface TicketList {
    total: number
    page: number
    pageSize: number
    tickets: Ticket[]
}


export interface CreateLogResponse {
    mensagem: string;
    log: TicketLog;
}
