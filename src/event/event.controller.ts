import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UpdateContentDto } from './dto/content/update-content.dto'
import { CreateEventDto } from './dto/event/create-event.dto'
import { GetAllEventQueryDto } from './dto/event/get-all-event-query-dto'
import { GetEventsByRangeQueryDto } from './dto/event/get-events-by-range-query.dto'
import { UpdateEventDto } from './dto/event/update-event.dto'
import { CreateTodoDto } from './dto/todo/create-todo.dto'
import { UpdateTodoDto } from './dto/todo/update-todo.dto'
import { EventService } from './event.service'
import { GetBatchDto } from './dto/event/get-batch.dto'

@ApiTags('event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  // ---------------------------------- event ---------------------------------

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.eventService.get(id)
  }

  @Get('batch')
  async getBatch(@Query() { ids }: GetBatchDto) {
    return this.eventService.getBatch(ids)
  }

  @Get('list')
  async getAll(@Query() dto: GetAllEventQueryDto) {
    return this.eventService.getAll(dto)
  }

  @Get('list/range')
  getByRange(@Query() { unit, start, end }: GetEventsByRangeQueryDto) {
    return this.eventService.getByRange(unit, start, end)
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
  remove(@Param('id') id: number) {
    return this.eventService.remove(id)
  }

  // --------------------------------- content --------------------------------

  @Get(':id/content')
  getContent(@Param('id') id: number) {
    return this.eventService.getContent(id)
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
