import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanService } from 'src/application/plan.service';
import { CreatePlanUseCase } from 'src/application/useCases/createPlan.useCase';
import { GetPlanUseCase } from 'src/application/useCases/getPlan.useCase';
import { RemovePlanUseCase } from 'src/application/useCases/removePlan.useCase';
import { PlanRepositoryAbstract } from 'src/domain/planRepository.abstract';
import { IPlanService } from 'src/domain/planService.abstract';
import { PlanRepository } from 'src/infra/plan.repository';
import { PlanModel } from '../domain/plan.model';
import { PlanController } from './plan.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PlanModel])],
  controllers: [PlanController],
  providers: [
    {
      provide: PlanRepositoryAbstract,
      useClass: PlanRepository,
    },
    {
      provide: IPlanService,
      useClass: PlanService,
    },
    PlanService,
    CreatePlanUseCase,
    GetPlanUseCase,
    RemovePlanUseCase,
  ],
})
export class PlanModule {}
