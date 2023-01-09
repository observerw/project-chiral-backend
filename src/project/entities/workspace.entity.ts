import type { Workspace } from '@prisma/client'

export class WorkspaceEntity implements Workspace {
  id: number
  origin: string | null
  layout: object[] | null
  projectId: number
  lock: boolean
}
