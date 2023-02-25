import { EventEntity } from './event.entity'

export class EventDetailEntity extends EventEntity {
  characters: number[]
  scenes: number[]
  sups: number[]
  subs: number[]
}
