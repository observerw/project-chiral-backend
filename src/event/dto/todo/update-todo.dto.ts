import { IsBoolean, IsHexColor, IsOptional } from 'class-validator'

export class UpdateTodoDto {
  @IsHexColor()
  @IsOptional()
  color?: string

  @IsBoolean()
  @IsOptional()
  checked?: boolean
}
