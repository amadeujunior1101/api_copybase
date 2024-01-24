import { PlanModel } from './plan.model';

export abstract class PlanRepositoryAbstract {
  abstract findAll(): Promise<PlanModel[]>;

  abstract create(planModel: PlanModel): Promise<PlanModel>;

  abstract delete(planModel: PlanModel): Promise<void>;
}
