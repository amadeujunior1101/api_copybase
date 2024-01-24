import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PlanEntity } from './plan.entity';

@Entity()
export class PlanModel implements PlanEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  jsonData: string;
}
