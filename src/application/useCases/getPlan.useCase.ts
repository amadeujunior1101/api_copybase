import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PlanRepositoryAbstract } from 'src/domain/planRepository.abstract';

@Injectable()
export class GetPlanUseCase {
  constructor(private readonly planRepository: PlanRepositoryAbstract) {}

  async execute(): Promise<any[]> {
    try {
      const plansArray = await this.planRepository.findAll();

      if (plansArray && plansArray.length > 0) {
        const parsedData = JSON.parse(plansArray[0].jsonData);

        return parsedData;
      } else {
        return [];
      }
    } catch (e) {
      throw new HttpException(
        `Error executing: ${e.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
