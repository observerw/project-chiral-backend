import { IsOptional, IsString } from 'class-validator'

export class UnregisterFileDto {
  /**
   * 待删除文件的名称，如果不指定则删除整个文件夹
   */
  @IsString()
  @IsOptional()
  name?: string

  /**
   * 文件夹路径
   */
  @IsString()
  position: string
}
