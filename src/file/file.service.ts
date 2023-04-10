import { mkdir, readdir, rename, rm, stat, writeFile } from 'fs/promises'
import path from 'path'
import { Injectable } from '@nestjs/common'
import { SchedulerRegistry } from '@nestjs/schedule'
import { extension } from 'mime-types'
import { filesPath, tempFilePath } from 'src/file/const/static'
import { sha512 } from 'src/utils/crypto'
import type { MemoryStorageFile } from '@blazity/nest-file-fastify'
import type { RegisterFileDto } from './dto/register-file.dto'
import type { UnregisterFileDto } from './dto/unregister-file.dto'
import { removeFile } from './const/task'
import type { UploadFileDto } from './dto/upload-file.dto'
import type { UploadTempFileDto } from './dto/upload-temp-file.dto'

@Injectable()
export class FileService {
  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  private _hashName(file: MemoryStorageFile) {
    const hash = sha512(file.buffer)
    const ext = extension(file.mimetype)
    return `${hash}.${ext}`
  }

  /**
   * 上传文件并保存在temp文件夹中，temp文件夹会定期清理
   */
  async uploadTempFile({ file }: UploadTempFileDto) {
    const fileName = this._hashName(file)
    await writeFile(
      path.join(tempFilePath, fileName),
      file.buffer,
    )
    return path.join('static', 'temp', fileName)
  }

  async checkTempFile(name: string) {
    try {
      await stat(path.join(tempFilePath, name))
      return path.join('static', 'temp', name)
    }
    catch (e) {
      return ''
    }
  }

  async registerFile({ name, position, replace = false }: RegisterFileDto) {
    const dirPath = path.join(filesPath, position)
    const filePath = path.join(dirPath, name)

    // 如果文件处于删除过程中，取消删除
    if (this.schedulerRegistry.doesExist('timeout', removeFile(filesPath, position, name))) {
      this.schedulerRegistry.deleteTimeout(removeFile(filesPath, position, name))
    }
    if (replace) {
      // 如果replace，将指定位置的文件删除
      try {
        const files = await readdir(dirPath)
        for (const file of files) {
          if (file === name) { continue }
          const filePath = path.join(filesPath, position, file)
          this.schedulerRegistry.addTimeout(
            removeFile(filesPath, position, file),
            setTimeout(() => this._removeFile(filePath), 1000 * 60 * 60),
          )
        }
      }
      catch (e) {}
    }

    try {
      // 如果文件存在，直接返回
      await stat(filePath)
      return path.join('static', 'files', position, name)
    }
    catch (e) {
      // 如果文件不存在，将temp文件夹中的文件移动到指定位置
      return await this._registerTempFile(position, name)
    }
  }

  async unregisterFile({ name = '', position }: UnregisterFileDto) {
    const filePath = path.join(filesPath, position, name)
    try {
      await stat(filePath)
      this.schedulerRegistry.addTimeout(
        removeFile(filePath),
        setTimeout(() => this._removeFile(filePath), 1000 * 60 * 60),
      )
      return path.join('static', 'files', position, name)
    }
    catch (e) {
      return ''
    }
  }

  /**
   * 将temp文件夹中的文件移动到指定位置
   */
  async _registerTempFile(position: string, name: string) {
    try {
      await stat(path.join(tempFilePath, name))
      await mkdir(path.join(filesPath, position), { recursive: true })
      await rename(
        path.join(tempFilePath, name),
        path.join(filesPath, position, name),
      )
      return path.join('static', 'files', position, name)
    }
    catch (e) {
      return ''
    }
  }

  /**
   * 删除文件
   */
  async _removeFile(position: string) {
    await rm(
      path.join(filesPath, position),
      { recursive: true, force: true },
    )
  }

  async uploadFile({ file, position, replace }: UploadFileDto) {
    const name = this._hashName(file)
    await this.uploadTempFile({ file })
    await this.registerFile({ name, position, replace })
    return path.join('static', 'files', position, name)
  }
}
