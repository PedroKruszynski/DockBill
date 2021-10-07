import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  idAccount: string;

  @Column()
  value: number;

  @CreateDateColumn()
  created_at: Date;
}

export default Transaction;
