import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PlanRepositoryAbstract } from 'src/domain/planRepository.abstract';

@Injectable()
export class RemovePlanUseCase {
  constructor(private readonly planRepository: PlanRepositoryAbstract) {}

  async execute(): Promise<void> {
    try {
      const plan = await this.planRepository.findAll();

      await this.planRepository.delete(plan[0]);
    } catch (e) {
      throw new HttpException(
        `Error executing: ${e.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
