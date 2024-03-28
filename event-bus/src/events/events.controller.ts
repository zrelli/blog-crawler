import { Controller, Post, Body } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
  @Post()
  async crawlPage(@Body('type') type: string, @Body('data') data: any) {
    const payload = { type, data };
    return this.eventsService.publish(payload);
  }
}
