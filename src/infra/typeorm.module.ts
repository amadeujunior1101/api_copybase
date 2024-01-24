import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanModel } from 'src/domain/plan.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './database.sqlite',
      entities: [PlanModel],
      synchronize: true,
    }),
  ],
  exports: [TypeOrmModule],
})
export class TypeormModule {}
