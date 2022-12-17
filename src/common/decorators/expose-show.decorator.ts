import { applyDecorators } from '@nestjs/common'
import type { ApiPropertyOptions } from '@nestjs/swagger'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export const ExposeShow = (options?: ApiPropertyOptions) => applyDecorators(
  Expose(),
  ApiProperty(options),
)

export default ExposeShow
