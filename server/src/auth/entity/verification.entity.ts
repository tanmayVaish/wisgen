import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Verification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  token: string;

  @Column()
  expires: Date;
}
