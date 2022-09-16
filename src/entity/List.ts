import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  time: Date;

  @Column({ nullable: false })
  state: string;
}
