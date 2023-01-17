import type { ArgumentMetadata, PipeTransform } from '@nestjs/common'
import { BadRequestException, Injectable } from '@nestjs/common'
import { UnitID } from '@project-chiral/unit-id'

@Injectable()
export class ParseUnitIDPipe implements PipeTransform<string, UnitID> {
  transform(value: string, _metadata: ArgumentMetadata) {
    try {
      return UnitID.deserialize(value)
    }
    catch (e) {
      throw new BadRequestException(e)
    }
  }
}
