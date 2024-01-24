import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as csvParser from 'csv-parser';
import * as fs from 'fs';
import { PlanEntity } from 'src/domain/plan.entity';
import { IUploadedFile } from 'src/domain/plan.interface';
import { PlanRepositoryAbstract } from 'src/domain/planRepository.abstract';
import { Stream } from 'stream';
import * as xlsx from 'xlsx';
import {
  EXPECTED_COLUMN_NAMES,
  ID,
  SerializedDataItem,
} from '../plan.interface';
import { PlanService } from '../plan.service';

@Injectable()
export class CreatePlanUseCase {
  constructor(
    private readonly planService: PlanService,
    private readonly planRepository: PlanRepositoryAbstract,
  ) {}
  async execute(file: IUploadedFile): Promise<any[]> {
    const buffer = file.buffer;
    const extension = (file.originalname.split('.').pop() || '').toLowerCase();

    if (extension === 'xlsx') {
      const workbook = xlsx.read(buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const jsonData: SerializedDataItem[] = xlsx.utils.sheet_to_json(sheet, {
        raw: false,
        defval: '',
      });

      const columnsFound = Object.keys(jsonData[0]);

      if (!this.planService.equalColumns(columnsFound, EXPECTED_COLUMN_NAMES)) {
        throw new HttpException(
          `Nomes das colunas no XLSX não correspondem aos esperados: ${EXPECTED_COLUMN_NAMES}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const serializedData = this.planService.convertDatesToMinutes(jsonData);

      const graphics = this.planService.calculateMetrics(serializedData);

      const formattedData = graphics.map((entry) => ({
        ...entry,
        data: [parseFloat(entry.data[0]).toFixed(2), Math.round(entry.data[1])],
      }));

      const planEntity = new PlanEntity(ID, JSON.stringify(formattedData));

      await this.planRepository.create(planEntity);

      return formattedData;
    } else if (extension === 'csv') {
      const data = [];
      let columnsCSV: string[];

      const stream: Stream =
        buffer instanceof Buffer
          ? new Stream.PassThrough().end(buffer)
          : fs.createReadStream(file.path);

      for await (const row of stream.pipe(csvParser())) {
        if (!columnsCSV) {
          columnsCSV = Object.keys(row);

          if (
            !this.planService.equalColumns(columnsCSV, EXPECTED_COLUMN_NAMES)
          ) {
            stream.emit('close');
            throw new HttpException(
              `Nomes das colunas no CSV não correspondem aos esperados: ${EXPECTED_COLUMN_NAMES}`,
              HttpStatus.BAD_REQUEST,
            );
          }
        }
        if (row.valor) {
          row.valor = row.valor.replace(',', '.');
        }
        if (row['data início']) {
          const [dia, mes, ano] = row['data início'].split('/');
          row['data início'] =
            mes > 12 ? `${dia}/${mes}/${ano}` : `${mes}/${dia}/${ano}`;
        }
        if (row['data status']) {
          const [dia, mes, ano] = row['data status'].split('/');
          row['data status'] = `${mes}/${dia}/${ano}`;
        }
        data.push(row);
      }

      const graphics = this.planService.calculateMetrics(data);

      const formattedData = graphics.map((entry) => ({
        ...entry,
        data: [parseFloat(entry.data[0]).toFixed(2), Math.round(entry.data[1])],
      }));

      const planEntity = new PlanEntity(ID, JSON.stringify(formattedData));

      await this.planRepository.create(planEntity);

      return formattedData;
    }

    throw new HttpException(
      'Formato de arquivo não suportado.',
      HttpStatus.BAD_REQUEST,
    );
  }
}
