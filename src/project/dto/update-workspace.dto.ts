import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator'

export class UpdateWorkspaceDto {
  @IsString()
  @IsOptional()
  origin?: string

  @IsArray()
  @IsOptional()
  layout?: object[]

  @IsBoolean()
  @IsOptional()
  lock?: boolean
}
