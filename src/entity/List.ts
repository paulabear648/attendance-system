import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class List {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    name: string;

  @Column()
    state: string;
}
