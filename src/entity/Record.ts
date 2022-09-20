import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  time: Date;

  @Column({ nullable: false })
  state: string;
}
