import { BadRequestException, applyDecorators } from '@nestjs/common'
import { UnitIDRange } from '@project-chiral/unit-system'
import { Transform } from 'class-transformer'

// export const TransformUnitID = () => applyDecorators(
//   Transform(({ value }) => {
//     if (typeof value !== 'string') { throw new BadRequestException('Expected string') }
//     try { return UnitID.deserialize(value) }
//     catch (e) { throw new BadRequestException(e) }
//   }, { toClassOnly: true }),
//   Transform(({ value }) => {
//     if (!(value instanceof UnitID)) {
//       throw new InternalServerErrorException(`Expected UnitID, got ${value}`)
//     }
//     return value.serialize()
//   }, { toPlainOnly: true }),
// )

export const TransformUnitIDRange = () => applyDecorators(
  Transform(({ value }) => {
    if (typeof value !== 'string') { throw new BadRequestException('Expected string') }
    try { return UnitIDRange.deserialize(value) }
    catch (e) { throw new BadRequestException(e) }
  }, { toClassOnly: true }),
  // Transform(({ value }) => {
  //   if (!(value instanceof UnitIDRange)) {
  //     throw new InternalServerErrorException(`Expected UnitIDRange, got ${value}`)
  //   }
  //   return value.serialize()
  // }, { toPlainOnly: true }),
)

