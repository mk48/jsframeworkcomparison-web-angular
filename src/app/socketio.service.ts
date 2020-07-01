import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable()
export class SocketioService {
  socket;
  constructor() {}

  setupSocketConnection() {
    this.socket = io('http://localhost:3001/');

    //this.socket.emit('my message', 'Hello there from Angular.');

    /*this.socket.on('newStockValues', (data: string) => {
      console.log(data);
    });*/
  }

  public getStockUpdates() {
    return Observable.create((observer) => {
      this.socket.on('newStockValues', (data) => {
        observer.next(data);
      });
    });
  }
}
