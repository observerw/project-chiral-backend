import { FileInterceptor, MemoryStorageFile, UploadedFile } from '@blazity/nest-file-fastify'
import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common'
import { ApiConsumes } from '@nestjs/swagger'
import { RegisterFileDto } from './dto/register-file.dto'
import { UnregisterFileDto } from './dto/unregister-file.dto'
import { UploadFileDto } from './dto/upload-file.dto'
import { UploadTempFileDto } from './dto/upload-temp-file.dto'
import { FileService } from './file.service'

@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
  ) {}

  /**
   * 上传临时文件
   */
  @Post('upload/temp')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  uploadTempFile(@Body() dto: UploadTempFileDto, @UploadedFile() file: MemoryStorageFile) {
    return this.fileService.uploadTempFile({ ...dto, file })
  }

  /**
   * 检查临时文件是否已经存在
   */
  @Get('check/temp/:name')
  checkTempFile(@Param('name') name: string) {
    return this.fileService.checkTempFile(name)
  }

  @Put('register')
  registerFile(@Body() dto: RegisterFileDto) {
    return this.fileService.registerFile(dto)
  }

  @Delete('register')
  unregisterFile(@Body() dto: UnregisterFileDto) {
    return this.fileService.unregisterFile(dto)
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  uploadFile(@Body() dto: UploadFileDto, @UploadedFile() file: MemoryStorageFile) {
    // file必须通过req.storageFile的方式取出，此处的dto仅作为类型提示
    return this.fileService.uploadFile({ ...dto, file })
  }
}
