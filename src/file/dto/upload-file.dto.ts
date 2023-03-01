import { MemoryStorageFile } from '@blazity/nest-file-fastify'
import { Type } from 'class-transformer'
import { IsBoolean, IsOptional, IsString } from 'class-validator'
import { ApiFile } from 'src/common/decorators/api-file.decorator'

export class UploadFileDto {
  @IsString()
  position: string

  @ApiFile()
  file: MemoryStorageFile

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  replace?: boolean
}
