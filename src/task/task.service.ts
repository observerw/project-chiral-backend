import { readdir, stat, unlink } from 'fs/promises'
import path from 'path'
import { Injectable } from '@nestjs/common'
import { Interval } from '@nestjs/schedule'
import { tempFilePath } from 'src/file/const/static'

@Injectable()
export class TaskService {
  @Interval(1000 * 60 * 60 * 24)
  async clearTempFile() {
    const names = await readdir(tempFilePath)
    const nowStamp = (new Date()).valueOf()

    await Promise.all(names.map(async name => {
      const filePath = path.join(tempFilePath, name)
      const { birthtime } = await stat(filePath)
      const birthStamp = birthtime.valueOf()
      return (nowStamp - birthStamp > 1000 * 60 * 60 * 24)
        ? unlink(filePath)
        : Promise.resolve()
    }))
  }
}
