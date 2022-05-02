import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Service2 {
  text = "Service 2";
  constructor() { 
    console.log("Service 2 - constructor()");
  }
}
