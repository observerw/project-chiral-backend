import { Exclude } from 'class-transformer'

export const ExcludeToClass = () => Exclude({ toClassOnly: true })

export const ExcludeToPlain = () => Exclude({ toPlainOnly: true })
