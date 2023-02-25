import { Type } from 'class-transformer'
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateSceneDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  description?: string

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  sup?: number

  @IsInt({ each: true })
  @Type(() => Number)
  @IsOptional()
  subs?: number[]

  @IsInt({ each: true })
  @Type(() => Number)
  @IsOptional()
  events?: number[]
}
