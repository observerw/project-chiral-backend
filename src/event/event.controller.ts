import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UpdateContentDto } from './dto/content/update-content.dto'
import { CreateEventDto } from './dto/event/create-event.dto'
import { GetEventsQueryDto } from './dto/event/get-events-query.dto'
import { UpdateEventDto } from './dto/event/update-event.dto'
import { EventService } from './event.service'

@ApiTags('event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  // ---------------------------------- event ---------------------------------

  @Get(':id')
  async getEvent(@Param('id') id: number) {
    return this.eventService.getEvent(id)
  }

  /**
   * 获取事件的详细信息
   * @param id 事件id
   */
  @Get(':id/detail')
  async getEventDetail(@Param('id') id: number) {
    return this.eventService.getEventDetail(id)
  }

  /**
   * 根据时间范围或给定id列表获取事件，将二者的并集返回
   * @param range 时间范围
   * @param ids 事件id列表
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

  // --------------------------------- content --------------------------------

  @Get(':id/content')
  getContent(@Param('id') id: number) {
    return this.eventService.getContent(id)
  }

  /**
   * 获取事件内容的开头片段，用于简略的展示
   * @param id 事件id
   */
  getContentBrief(@Param('id') id: number) {
    // TODO
  }

  @Put(':id/content')
  updateContent(@Param('id') id: number, @Body() dto: UpdateContentDto) {
    return this.eventService.updateContent(id, dto)
  }

  // ---------------------------------- todo ----------------------------------

  /**
   * 获取某个事件的全部todo项
   * @param id 事件id
   */
  @Get(':id/todo')
  getTodos(@Param('id') id: number) {
    // TODO
  }

  /**
   * 获取单个todo项
   * @param id todo项id
   */
  @Get('todo/:id')
  getTodo(@Param('id') id: number) {
    // TODO
  }

  @Post(':id/todo')
  createTodo(@Param('id') id: number) {
    // TODO
  }

  @Put(':id/todo')
  updateTodo(@Param('id') id: number) {
    // TODO
  }

  @Delete('todo/:id')
  removeTodo(@Param('id') id: number) {
    // TODO
  }
}
