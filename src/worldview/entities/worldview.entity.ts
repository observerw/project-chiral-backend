import type { Worldview } from '@prisma/client'

export class WorldviewEntity implements Worldview {
  id: number
  name: string
  description: string | null
  content: string
  images: string[]
  deleted: Date | null
  superId: number | null
}
