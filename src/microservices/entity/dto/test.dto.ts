import { ApiProperty } from '@nestjs/swagger'

export class TestDto {
  @ApiProperty()
  id: string
}
