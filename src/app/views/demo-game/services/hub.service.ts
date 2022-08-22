import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class HubService{
    public hubConnection: signalR.HubConnection | null = null;
    setIntervalInstance: any;
    constructor(
      private notifyService: NotifyService,
    ) {}

    public startConnection = () => {
        this.hubConnection = new signalR.HubConnectionBuilder()
          .configureLogging(signalR.LogLevel.None)
          .withUrl(environment.host + '/gameHub', {
            transport: signalR.HttpTransportType.WebSockets,
            skipNegotiation: true,
          })
          .build();
        this.hubConnection
          .start()
          .then(() => {
            console.log("connection start");
            this.notifyService.success('connection start','success');
          })
          .catch((err) => {
            console.log('Error while starting connection: ' + err);
          });
      };

    
}