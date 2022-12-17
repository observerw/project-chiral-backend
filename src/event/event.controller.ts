import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateContentDto } from './dto/content/create-content.dto'
import { UpdateContentDto } from './dto/content/update-content.dto'
import { CreateEventDto } from './dto/event/create-event.dto'
import { GetEventsQueryDto } from './dto/event/get-events-query.dto'
import { UpdateEventDto } from './dto/event/update-event.dto'
import { EventService } from './event.service'

@ApiTags('event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  /* ---------------------------------- event --------------------------------- */

  @Get(':id')
  async getEvent(@Param('id') id: number) {
    return this.eventService.getEvent(id)
  }

  /**
   * 根据时间范围或给定id列表获取事件，将二者的并集返回
   */
  @Get()
  getEvents(@Query() { range, ids }: GetEventsQueryDto) {
    return this.eventService.getEvents(range, ids)
  }

  @Post()
  createEvent(@Body() dto: CreateEventDto) {
    return this.eventService.createEvent(dto)
  }

  @Put(':id')
  updateEvent(@Param('id') id: number, @Body() dto: UpdateEventDto) {
    return this.eventService.updateEvent(id, dto)
  }

  @Delete(':id')
  removeEvent(@Param('id') id: number) {
    return this.eventService.removeEvent(id)
  }

  /* --------------------------------- content -------------------------------- */

  @Get(':id/content')
  getContent(@Param('id') id: number) {
    // TODO
  }

  @Post(':id/content')
  createContent(@Param('id') id: number, @Body() dto: CreateContentDto) {
    return this.eventService.createContent(id, dto)
  }

  @Put(':id/content')
  updateContent(@Param('id') id: number, @Body() dto: UpdateContentDto) {
    return this.eventService.updateContent(id, dto)
  }

  /* ---------------------------------- todo ---------------------------------- */

  @Get(':id/todo')
  getTodos(@Param('id') id: number) {
    // TODO
  }

  @Post(':id/todo')
  createTodo(@Param('id')id: number) {
    // TODO
  }

  @Put(':id/todo')
  updateTodo(@Param('id')id: number) {
    // TODO
  }

  @Delete(':id/todo')
  removeTodo(@Param('id')id: number) {
    // TODO
  }
}
