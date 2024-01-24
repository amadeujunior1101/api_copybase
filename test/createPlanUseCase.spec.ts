import { CreatePlanUseCase } from 'src/application/useCases/createPlan.useCase';
import { PlanRepositoryAbstract } from 'src/domain/planRepository.abstract';
import { beforeEach, expect, test, vi } from 'vitest';
import xlsx from 'xlsx';
import { data, mockedMetrics } from './utils/mocks';

const planServiceMock = {
  equalColumns: vi.fn(),
  convertNumericToDate: vi.fn(),
  convertDatesToMinutes: vi.fn(),
  calculateMetrics: vi.fn(),
};

const planRepositoryMock = {
  create: vi.fn(),
  findAll: vi.fn(),
  delete: vi.fn(),
} as PlanRepositoryAbstract;

const ws = xlsx.utils.aoa_to_sheet(data);
const wb = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(wb, ws, 'Sheet 1');

// vi.mock('csv-parser', () => ({
//   __esModule: true,
//   default: vi.fn().mockImplementation(() => {
//     return {
//       on: vi.fn(),
//     };
//   }),
// }));

let createPlanUseCase: CreatePlanUseCase;

beforeEach(() => {
  createPlanUseCase = new CreatePlanUseCase(
    planServiceMock as any,
    planRepositoryMock,
  );
});

test('should handle XLSX file correctly', async () => {
  const buffer = xlsx.write(wb, {
    bookType: 'xlsx',
    type: 'buffer',
  });

  const xlsxFile = {
    buffer: Buffer.from(buffer),
    originalname: 'arquivo.xlsx',
  };
  planServiceMock.equalColumns.mockReturnValue(true);

  planServiceMock.calculateMetrics.mockReturnValueOnce(mockedMetrics);

  planRepositoryMock.create = vi.fn().mockResolvedValueOnce(undefined);

  const result = await createPlanUseCase.execute(xlsxFile);

  expect(result).toEqual(mockedMetrics);
});

test('should handle unsupported file format', async () => {
  const bufferFail = xlsx.write(wb, {
    bookType: 'txt',
    type: 'buffer',
  });

  await expect(createPlanUseCase.execute(bufferFail)).rejects.toThrow();
});
