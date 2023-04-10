import { Type } from 'class-transformer'

class Resolved {
  id: number
}

class CharaOption {
  id: number
  name: string
  alias: string
  score: number
}

class Unresolved {
  name: string
  @Type(() => CharaOption)
  options: CharaOption[]
}

export class CharaOptionsDto {
  @Type(() => Resolved)
  resolved: Resolved[]

  @Type(() => Unresolved)
  unresolved: Unresolved[]
}
