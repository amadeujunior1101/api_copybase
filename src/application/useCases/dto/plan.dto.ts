import { ApiProperty } from '@nestjs/swagger';

class PlanDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  file: Array<Express.Multer.File>;
}

export { PlanDto };
