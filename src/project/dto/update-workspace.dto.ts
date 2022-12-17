import { Type } from 'class-transformer'
import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator'

export class CreateLayoutDto {
  @IsString()
  id: string

  @IsArray()
  @Type(() => Number)
  @ArrayMinSize(4)
  position: number[]
}

export class UpdateWorkspaceDto {
  @IsString()
  @IsOptional()
  origin?: string

  @IsArray()
  @Type(() => CreateLayoutDto)
  @IsOptional()
  layout?: CreateLayoutDto[]
}
