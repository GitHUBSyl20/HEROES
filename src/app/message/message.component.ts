import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(public messageService: MessageService) { }
  //The messageService property must be public because you're going to bind to it in the template.
  //Angular only binds to public component properties.
  ngOnInit() {
  }

}
