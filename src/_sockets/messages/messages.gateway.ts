import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';

import { MessagesService } from './messages.service';
import { CreateMessageDto, UpdateMessageDto } from './dto';

@WebSocketGateway()
export class MessagesGateway {
  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  create(@MessageBody() message: CreateMessageDto) {
    return this.messagesService.create(message);
  }

  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.messagesService.findAll();
  }

  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: number) {
    return this.messagesService.findOne(id);
  }

  @SubscribeMessage('updateMessage')
  update(@MessageBody() message: UpdateMessageDto) {
    return this.messagesService.update(message.id, message);
  }

  @SubscribeMessage('removeMessage')
  remove(@MessageBody() id: number) {
    return this.messagesService.remove(id);
  }
}
