import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Socket } from 'socket.io';

export const ChatMessage = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const message = ctx.switchToWs().getData();

    if (!message) {
      throw new BadRequestException('room is undefined');
    }

    return message;
  }
);
