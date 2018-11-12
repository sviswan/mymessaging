import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { CreateMessageComponent } from './create-message/create-message.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';// dependency for OwlDateTimeModule
import { FileSelectDirective } from 'ng2-file-upload';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { DataService } from './core/data.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    CreateMessageComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot()
],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
