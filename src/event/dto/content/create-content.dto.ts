import { IsString } from 'class-validator'

export class CreateContentDto {
  @IsString()
  content: string
}
