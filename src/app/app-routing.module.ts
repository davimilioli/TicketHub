import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreateTicketComponent } from './pages/create-ticket/create-ticket.component';
import { TicketDetailComponent } from './pages/ticket-detail/ticket-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'criarTicket',
    component: CreateTicketComponent
  },
  {
    path: 'ticket/:id',
    component: TicketDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
