import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanEntity } from 'src/domain/plan.entity';
import { PlanRepositoryAbstract } from 'src/domain/planRepository.abstract';
import { Repository } from 'typeorm';
import { PlanModel } from '../domain/plan.model';

@Injectable()
export class PlanRepository implements PlanRepositoryAbstract {
  constructor(
    @InjectRepository(PlanModel)
    private readonly planRepository: Repository<PlanModel>,
  ) {}

  async findAll(): Promise<PlanEntity[]> {
    return this.planRepository.find();
  }

  async create(planModel: PlanEntity): Promise<PlanModel> {
    await this.delete(planModel);
    return await this.planRepository.save({ ...planModel });
  }

  async delete(PlanEntity: PlanEntity): Promise<void> {
    await this.planRepository.delete(PlanEntity);
  }
}
