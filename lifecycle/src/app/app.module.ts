import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { MainLifecycleComponent } from './main-lifecycle/main-lifecycle.component';
import { LifecycleChildComponent } from './main-lifecycle/lifecycle-child/lifecycle-child.component';
import { ChildChildComponent } from './main-lifecycle/lifecycle-child/child-child/child-child.component';
import { CheckComponent } from './check/check.component';
import { CheckChildComponent } from './check/check-child/check-child.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLifecycleComponent,
    LifecycleChildComponent,
    ChildChildComponent,
    CheckComponent,
    CheckChildComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
