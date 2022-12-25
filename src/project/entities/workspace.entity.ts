import type { Workspace } from '@prisma/client'
import { Type } from 'class-transformer'

class LayoutEntity {
  id: string

  @Type(() => Number)
  position: number[]
}

export class WorkspaceEntity implements Omit<Workspace, 'layout'> {
  id: number

  origin: string

  @Type(() => LayoutEntity)
  layout: LayoutEntity[]

  projectId: number
}
