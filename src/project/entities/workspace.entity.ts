import { Type } from 'class-transformer'

class LayoutEntity {
  id: string

  @Type(() => Number)
  position: number[]
}

export class WorkspaceEntity {
  origin: string

  @Type(() => LayoutEntity)
  layout: LayoutEntity[]
}
