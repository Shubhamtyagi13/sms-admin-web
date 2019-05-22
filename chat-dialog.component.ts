import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ChatBotService, Message } from '../chat-bot.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';


@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss']
})
export class ChatDialogComponent implements OnInit, AfterViewChecked {

  messages: Observable<Message[]>;
  formValue: string;
  showChat: boolean;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  constructor(public chat: ChatBotService) { }

  ngOnInit() {
    this.showChat = false;
    this.openChatBox();
    this.messages = this.chat.conversation.asObservable()
        .scan((acc, val) => acc.concat(val));
    this.scrollToBottom();
  }

  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = '';
  }

  showChatWindow() {
    this.showChat = true;
  }

  hideChatWindow() {
    this.showChat = false;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  openChatBox() {
    setTimeout (() => {
      if(!this.showChat) {
        this.showChatWindow();
      }
      }, 30000);
  }

}