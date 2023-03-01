import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class RegisterFileDto {
  /**
   * 文件名称
   */
  @IsString()
  name: string

  /**
   * 文件夹路径
   */
  @IsString()
  position: string

  /**
   * 是否将文件夹原先内容删除并替换为新文件
   *
   * 适用于文件夹有且仅有一个文件的情况
   */
  @IsBoolean()
  @IsOptional()
  replace?: boolean
}
