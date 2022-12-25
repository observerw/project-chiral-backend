import { Type } from 'class-transformer'
import { ArrayMinSize, IsArray, IsString } from 'class-validator'

export class CreateLayoutDto {
  @IsString()
  id: string

  @IsArray()
  @Type(() => Number)
  @ArrayMinSize(4)
  position: number[]
}

export class CreateWorkspaceDto {
  @IsString()
  origin: string

  @IsArray()
  @Type(() => CreateLayoutDto)
  layout: CreateLayoutDto[]
}
