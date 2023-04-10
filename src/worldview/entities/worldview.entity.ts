import type { Worldview } from '@prisma/client'

export class WorldviewEntity implements Worldview {
  id: number
  name: string
  description: string | null
  images: string[]
  deleted: Date | null
  superId: number | null

  sup: number | null
  projectId: number
  contentId: number | null
}
