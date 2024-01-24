import { IPlanData } from 'src/application/plan.interface';

export abstract class IPlanService {
  abstract convertDatesToMinutes(data: any[]): any[];

  abstract convertDateToDateOnly(dateString: string | number): string | null;

  abstract convertNumericToDate(numericValue: number): string;

  abstract equalColumns(
    columnsFound: string[],
    ExpectedColumns: string[],
  ): boolean;

  abstract calculateMetrics(plansData: IPlanData[]);
}
