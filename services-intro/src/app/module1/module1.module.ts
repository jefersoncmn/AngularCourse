import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component1Component } from './component1/component1.component';
import { Component2Component } from './component2/component2.component';
import { Service1 } from './service1.service';

@NgModule({
  declarations: [Component1Component, Component2Component],
  exports: [Component1Component, Component2Component],
  imports: [
    CommonModule
  ],
  providers: [ Service1 ], //Possibilita de todos os componentes acessarem o serviço
})
export class Module1Module { }
