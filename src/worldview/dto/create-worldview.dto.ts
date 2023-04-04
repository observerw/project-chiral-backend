import { IsOptional, IsString } from 'class-validator'

export class CreateWorldviewDto {
  @IsString()
  name: string

  @IsString()
  @IsOptional()
  description?: string
}
