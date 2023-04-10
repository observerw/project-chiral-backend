import { IsInt, IsOptional, Max, Min } from 'class-validator'

export class SummarizeDescDto {
  @IsInt()
  @IsOptional()
  length?: number

  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(100)
  abstraction?: number
}
