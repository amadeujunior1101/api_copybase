import { GetPlanUseCase } from 'src/application/useCases/getPlan.useCase';
import { PlanEntity } from 'src/domain/plan.entity';
import { PlanRepositoryAbstract } from 'src/domain/planRepository.abstract';
import { beforeEach, expect, test, vi } from 'vitest';

let getPlanUseCase: GetPlanUseCase;

const planRepository = {
  create: vi.fn(),
  findAll: vi.fn(),
  delete: vi.fn(),
} as PlanRepositoryAbstract;

beforeEach(() => {
  getPlanUseCase = new GetPlanUseCase(planRepository);
});

test('should be able to get bill by client code', async () => {
  planRepository.findAll = vi.fn().mockResolvedValueOnce([
    {
      jsonData: `[{"year":2022,"month":"jan","labels":["MRR","Churn rate"],"data":[4750.35,0]},
        {"year":2022,"month":"jun","labels":["MRR","Churn rate"],"data":[0,1]},
        {"year":2023,"month":"ago","labels":["MRR","Churn rate"],"data":[0,1]},
        {"year":2023,"month":"nov","labels":["MRR","Churn rate"],"data":[5437.39,0]}]`,
    },
  ]);

  const result: PlanEntity[] = await getPlanUseCase.execute();

  expect(result[0]).toEqual({
    year: 2022,
    month: 'jan',
    labels: ['MRR', 'Churn rate'],
    data: [4750.35, 0],
  });

  expect(result[2]).toEqual({
    year: 2023,
    month: 'ago',
    labels: ['MRR', 'Churn rate'],
    data: [0, 1],
  });
});

test('should handle the execute method when no plans are found', async () => {
  planRepository.findAll = vi.fn().mockResolvedValueOnce([]);

  const result = await getPlanUseCase.execute();

  expect(result).toEqual([]);
});

test('should handle errors thrown by the repository', async () => {
  planRepository.findAll = vi
    .fn()
    .mockRejectedValueOnce(new Error('Repository error'));

  await expect(getPlanUseCase.execute()).rejects.toThrowError(
    'Error executing: Repository error',
  );
});
