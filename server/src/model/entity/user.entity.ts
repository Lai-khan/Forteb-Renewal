import { Entity, Column, PrimaryColumn } from 'typeorm';
import { OAuth } from '../enum/oauth.enum';

@Entity()
export class User {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ type: 'enum', enum: OAuth })
  oauth: OAuth;

  @Column()
  created_at: Date;
}
