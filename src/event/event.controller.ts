import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UpdateContentDto } from './dto/content/update-content.dto'
import { CreateEventDto } from './dto/event/create-event.dto'
import { GetAllEventQueryDto } from './dto/event/get-all-event-query-dto'
import { GetEventsByRangeQueryDto } from './dto/event/get-events-by-range-query.dto'
import { MutateCharactersDto } from './dto/event/mutate-characters.dto'
import { MutateScenesDto } from './dto/event/mutate-scenes.dto'
import { MutateSubsDto } from './dto/event/mutate-subs.dto'
import { MutateSupsDto } from './dto/event/mutate-sups.dto'
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

  @Get(':id/detail')
  async getDetail(@Param('id') id: number) {
    return this.eventService.getDetail(id)
  }

  @Get('list')
  getAll(dto: GetAllEventQueryDto) {
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
  remove(@Param('id') id: number, @Query('cascade') cascade: boolean) {
    return this.eventService.remove(id, cascade)
  }

  @Put(':id/characters')
  addCharacters(@Param('id') id: number, @Body() { characters }: MutateCharactersDto) {
    return this.eventService.connect(id, 'characters', characters)
  }

  @Delete(':id/characters')
  removeCharacters(@Param('id') id: number, @Body() { characters }: MutateCharactersDto) {
    return this.eventService.disconnect(id, 'characters', characters)
  }

  @Put(':id/scenes')
  addScenes(@Param('id') id: number, @Body() { scenes }: MutateScenesDto) {
    return this.eventService.connect(id, 'scenes', scenes)
  }

  @Delete(':id/scenes')
  removeScenes(@Param('id') id: number, @Body() { scenes }: MutateScenesDto) {
    return this.eventService.disconnect(id, 'scenes', scenes)
  }

  @Put(':id/sups')
  addSups(@Param('id') id: number, @Body() { sups }: MutateSupsDto) {
    return this.eventService.connect(id, 'sups', sups)
  }

  @Delete(':id/sups')
  removeSups(@Param('id') id: number, @Body() { sups }: MutateSupsDto) {
    return this.eventService.disconnect(id, 'sups', sups)
  }

  @Put(':id/subs')
  addSubs(@Param('id') id: number, @Body() { subs }: MutateSubsDto) {
    return this.eventService.connect(id, 'subs', subs)
  }

  @Delete(':id/subs')
  removeSubs(@Param('id') id: number, @Body() { subs }: MutateSubsDto) {
    return this.eventService.disconnect(id, 'subs', subs)
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
