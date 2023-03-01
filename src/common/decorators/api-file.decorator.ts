import type { ApiPropertyOptions } from '@nestjs/swagger'
import { ApiProperty } from '@nestjs/swagger'

export const ApiFile = (_options?: ApiPropertyOptions): PropertyDecorator => (
  target: object, propertyKey: string | symbol,
) => {
  ApiProperty({
    type: 'file',
    properties: {
      [propertyKey]: {
        type: 'string',
        format: 'binary',
      },
    },
  })(target, propertyKey)
}
