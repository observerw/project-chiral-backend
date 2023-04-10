export class ResponseDto<T = string> {
  code: number
  message: string
  data: T
}
