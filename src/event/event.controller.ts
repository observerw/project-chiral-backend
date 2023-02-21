import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UpdateContentDto } from './dto/content/update-content.dto'
import { CreateEventDto } from './dto/event/create-event.dto'
import { GetEventsQueryDto } from './dto/event/get-events-query.dto'
import { UpdateEventDto } from './dto/event/update-event.dto'
import { CreateTodoDto } from './dto/todo/create-todo.dto'
import { UpdateTodoDto } from './dto/todo/update-todo.dto'
import { EventService } from './event.service'

@ApiTags('event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  // ---------------------------------- event ---------------------------------

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.eventService.get(id)
  }

  /**
   * 获取事件的详细信息
   * @param id 事件id
   */
  @Get(':id/detail')
  async getDetail(@Param('id') id: number) {
    return this.eventService.getDetail(id)
  }

  /**
   * 根据时间范围或给定id列表获取事件，将二者的并集返回
   * @param range 时间范围
   * @param ids 事件id列表
   */
  @Get('range')
  getByRange(@Query() { range }: GetEventsQueryDto) {
    return this.eventService.getByRange(range)
  }

  @Get('serial')
  getBySerial(@Param('serial') serial: number) {
    return this.getBySerial(serial)
  }

  @Get('search/name')
  searchByName(@Query('text') text: string) {
    return this.eventService.searchByName(text)
  }

  @Post()
  create(@Body() dto: CreateEventDto) {
    return this.eventService.create(dto)
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateEventDto) {
    return this.eventService.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Query('cascade') cascade: boolean) {
    return this.eventService.remove(id, cascade)
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

  @Get('search/content')
  searchContent(@Query('text') text: string) {
    return this.eventService.searchContent(text)
  }

  // ---------------------------------- todo ----------------------------------

  /**
   * 获取某个事件的全部todo项
   * @param id 事件id
   */
  @Get(':id/todo')
  getTodos(@Param('id') id: number) {
    return this.eventService.getTodos(id)
  }

  /**
   * 获取单个todo项
   * @param id todo项id
   */
  @Get('todo/:id')
  getTodo(@Param('id') id: number) {
    return this.eventService.getTodo(id)
  }

  @Post(':id/todo')
  createTodo(@Param('id') id: number, @Body() dto: CreateTodoDto) {
    return this.eventService.createTodo(id, dto)
  }

  @Put(':id/todo')
  updateTodo(@Param('id') id: number, @Body() dto: UpdateTodoDto) {
    return this.eventService.updateTodo(id, dto)
  }

  @Delete('todo/:id')
  removeTodo(@Param('id') id: number) {
    return this.eventService.removeTodo(id)
  }
}
