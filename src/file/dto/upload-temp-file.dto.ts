import { MemoryStorageFile } from '@blazity/nest-file-fastify'
import { ApiFile } from 'src/common/decorators/api-file.decorator'

export class UploadTempFileDto {
  @ApiFile()
  file: MemoryStorageFile
}
