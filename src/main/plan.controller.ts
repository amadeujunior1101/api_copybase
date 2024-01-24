import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiTags,
} from '@nestjs/swagger';
import { PlanDto } from 'src/application/useCases/dto/plan.dto';
import { GetPlanUseCase } from 'src/application/useCases/getPlan.useCase';
import { RemovePlanUseCase } from 'src/application/useCases/removePlan.useCase';
import { PlanEntity } from 'src/domain/plan.entity';
import { IUploadedFile } from 'src/domain/plan.interface';
import { CreatePlanUseCase } from '../application/useCases/createPlan.useCase';

@Controller()
@ApiTags('Plan')
export class PlanController {
  constructor(
    private readonly createPlanUseCase: CreatePlanUseCase,
    private readonly getPlanUseCase: GetPlanUseCase,
    private readonly removePlanUseCase: RemovePlanUseCase,
  ) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Carrega uma planilha de dados de assinantes',
    type: PlanDto,
  })
  @ApiBadRequestResponse({
    description: 'Erro nos dados da requisição.',
    schema: {
      properties: {
        statusCode: { type: 'number', example: HttpStatus.BAD_REQUEST },
        message: {
          type: 'string',
          example: 'Formato de arquivo não suportado.',
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: IUploadedFile): Promise<PlanEntity[]> {
    return this.createPlanUseCase.execute(file);
  }

  @Get('plan')
  async getPlan(): Promise<PlanEntity[]> {
    return this.getPlanUseCase.execute();
  }

  @Delete('plan')
  async removePlan(): Promise<void> {
    await this.removePlanUseCase.execute();
  }
}
