import { DomSanitizer } from '@angular/platform-browser';
import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  private chat;

  private chatSubscription;

  constructor(
    private chatService: ChatService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.chat = "Chat";
    this.fetchChat();
  }

  fetchChat() {
    this.chatSubscription = this.chatService.getChat()
      .subscribe(result => {
        //this.chat = this.sanitizer.bypassSecurityTrustScript(result);
      });
  }

  ngOnDestroy() {
    this.chatSubscription.unsubscribe();
  }
}
