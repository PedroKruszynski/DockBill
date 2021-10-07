import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('accounts')
class Account {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, type: 'uuid' })
    idUser: string;

    @Column({ type: 'money' })
    balance: number;

    @Column({ type: 'money' })
    withdrawalsDailyLimit: number;

    @Column({ type: 'boolean' })
    active: boolean;

    @Column({ type: 'int' })
    typeAccount: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Account;
