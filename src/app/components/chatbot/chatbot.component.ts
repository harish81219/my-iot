import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  isChatOpen = false;
  userMessage = '';
  messages: { text: string; sender: 'user' | 'bot' }[] = [];

  constructor(private chatService: ChatService) {}

  options: AnimationOptions = {
    path: '/assets/img/Animation - 1741329570838.json',
  };



  // Predefined bot responses
  responses: { [key: string]: string } = {
    'hello': 'Hi there! How can I help you?',
    'how are you': 'I am just a bot, but I am doing great!',
    'what is your name': 'I am your assistant chatbot.',
    'bye': 'Goodbye! Have a great day!',
    'help': 'Sure! Please tell me what you need help with.'
  };

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      this.messages.push({ text: this.userMessage, sender: 'user' });

      // Send message to ChatGPT API
      this.chatService.sendMessage(this.userMessage).subscribe((response) => {
        const botResponse = response.choices[0].message.content || "Sorry, I don't understand.";
        this.messages.push({ text: botResponse, sender: 'bot' });
      });

      this.userMessage = '';
    }
  }


}
