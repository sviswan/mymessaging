import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessagesComponent } from "./messages/messages.component";
import { CreateMessageComponent } from "./create-message/create-message.component";


const routes: Routes = [
    { path: '',  redirectTo: '/messages', pathMatch: 'full' },
    { path: "messages", component: MessagesComponent },
    { path: "create-message", component: CreateMessageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);