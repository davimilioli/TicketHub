import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Ticket, TicketList } from '../../Types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TicketService {
  baseApiUrl: string = environment.baseApiUrl;
  apiUrl: string = `${this.baseApiUrl}/api/ticket/`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<TicketList> {
    return this.http.get<TicketList>(this.apiUrl).pipe(
      catchError(this.errorRequest)
    )

  }

  create(data: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.apiUrl, data, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError(this.errorRequest)
    )
  }

  private errorRequest(error: HttpErrorResponse): Observable<any> {
    let message = 'Ocorreu algum erro';

    if(error.error instanceof ErrorEvent){
      message = `Erro: ${error.error.message}`;
    } else {
      message = `Código do erro: ${error.status} | Mensagem: ${error.message}`;
    }

    return throwError(() => new Error(message));
  }

}
