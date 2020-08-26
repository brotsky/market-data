import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Security from './Security';

@Entity()
export default class RequestLog {
  @PrimaryColumn()
  id: string;
  
  @Column()
  key: string;

  @Column({ type: 'jsonb', nullable: true })
  value: object;

  @Column()
  expirationDate: Date;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(() => Security, security => security.requestLogs)
  @JoinColumn()
  security: Security;
}
