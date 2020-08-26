import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import RequestLog from './RequestLog';

@Entity()
export default class Security {
  @PrimaryColumn()
  id: string;

  @Column()
  symbol: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToMany(() => RequestLog, requestLog => requestLog.security)
  requestLogs: RequestLog;
}
