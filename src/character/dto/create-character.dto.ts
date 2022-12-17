import { OmitType } from '@nestjs/swagger'
import { CharacterEntity } from '../entities/character.entity'

export class CreateCharacterDto extends OmitType(CharacterEntity, ['id'] as const) {}
