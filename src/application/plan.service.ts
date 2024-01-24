import { Injectable } from '@nestjs/common';
import { IPlanData, MONTH_NAMES, SerializedDataItem } from './plan.interface';

@Injectable()
export class PlanService {
  convertDatesToMinutes(data: SerializedDataItem[]): any[] {
    return data.map((row) => {
      row['data início'] = this.convertDateToDateOnly(row['data início']);
      row['data status'] = this.convertDateToDateOnly(row['data status']);
      row['data cancelamento'] = this.convertDateToDateOnly(
        row['data cancelamento'],
      );
      row['próximo ciclo'] = this.convertDateToDateOnly(row['próximo ciclo']);
      return row;
    });
  }

  convertDateToDateOnly(dateString: string | number): string | null {
    if (typeof dateString === 'number') {
      return dateString.toString();
    }

    const dateParts = dateString.split('/');
    if (dateParts.length === 3) {
      const day = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10);
      const year = parseInt(dateParts[2], 10);

      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        return `${day}/${month}/${year}`;
      }
    }
    return null;
  }

  equalColumns(columnsFound: string[], ExpectedColumns: string[]): boolean {
    return (
      columnsFound.length === ExpectedColumns.length &&
      columnsFound.every((column, index) => column === ExpectedColumns[index])
    );
  }

  calculateMetrics(plansData: IPlanData[]) {
    const result = [];
    const monthData = {};

    for (const plan of plansData) {
      const { status, valor } = plan;
      const startDate = new Date(plan['data início']);

      const year = startDate.getFullYear();
      const month = this.getMonthName(startDate.getMonth());

      const mrr = status === 'Ativa' ? valor : 0;
      const churnRate = status === 'Cancelada' ? 1 : 0;

      const key = `${year}/${month}`;
      if (monthData[key]) {
        monthData[key].data[0] += mrr;
        monthData[key].data[1] += churnRate;
      } else {
        monthData[key] = {
          year,
          month,
          labels: ['MRR', 'Churn rate'],
          data: [mrr, churnRate],
        };
      }
    }

    for (const key in monthData) {
      if (monthData.hasOwnProperty(key)) {
        result.push(monthData[key]);
      }
    }

    result.sort((firstEntry, secondEntry) => {
      if (firstEntry.year !== secondEntry.year) {
        return firstEntry.year - secondEntry.year;
      }

      return (
        this.getMonthIndex(firstEntry.month) -
        this.getMonthIndex(secondEntry.month)
      );
    });

    return result;
  }

  private getMonthIndex(monthName: string) {
    const monthNames = MONTH_NAMES;

    return monthNames.indexOf(monthName);
  }

  private getMonthName(monthNumber: number) {
    const monthNames = MONTH_NAMES;

    return monthNames[monthNumber];
  }
}
