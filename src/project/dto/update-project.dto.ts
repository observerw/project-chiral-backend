import { OmitType, PartialType } from '@nestjs/swagger'
import { CreateProjectDto } from './create-project.dto'

export class UpdateProjectDto extends PartialType(OmitType(CreateProjectDto, ['workspace', 'settings'] as const)) {}
