import { DomSanitizer } from '@angular/platform-browser';
import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  private chat;
  private chatResult;

  private chatSubscription;

  constructor(
    private chatService: ChatService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.chat = "Chat";
    //this.fetchChat();
  }

  fetchChat() {
    this.chatSubscription = this.chatService.getChat()
      .subscribe(result => {
        console.log("chat result");
        this.chat = result;
        this.sanitizer.bypassSecurityTrustScript(this.chat);
        eval(this.chat);
      });
  }

  ngOnDestroy() {
    this.chatSubscription.unsubscribe();
  }
}
