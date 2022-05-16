import { Injectable } from '@angular/core';
import { Module1Module } from '../module1/module1.module';

@Injectable({
  providedIn: Module1Module //Indica qual módulo terá acesso a este serviço
})
export class Service1 {
  public num = 0;
  constructor() {
    this.num = Math.round(Math.random()*1000);
  }
}
