import Car from '@modules/Cars/infra/typeorm/entities/Car';
import Driver from '@modules/Drivers/infra/typeorm/entities/Driver';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('usage')
class Usage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @Column()
  car_id: string;

  @ManyToOne(() => Driver)
  @JoinColumn({ name: 'driver_id' })
  driver: Driver;

  @Column()
  driver_id: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  motivo: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Usage;
