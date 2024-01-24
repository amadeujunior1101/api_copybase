import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeormModule } from './infra/typeorm.module';
import { PlanModule } from './main/plan.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: false,
    }),
    PlanModule,
    TypeormModule,
  ],
})
export class MainModule {}
