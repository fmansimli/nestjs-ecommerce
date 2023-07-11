import { Injectable } from '@nestjs/common';

import { UpdateMessageDto, CreateMessageDto } from './dto';

@Injectable()
export class MessagesService {
  create(message: CreateMessageDto) {
    return message;
  }

  findAll() {
    return [{}, {}];
  }

  findOne(id: number) {
    return { id };
  }

  update(id: number, attrs: UpdateMessageDto) {
    return { id, ...attrs };
  }

  remove(id: number) {
    return { id };
  }
}
