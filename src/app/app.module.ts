import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import CONFIG_I18N from "./i18n-config";
import {I18nModule} from "translate-localization";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    I18nModule.forRoot(CONFIG_I18N)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
