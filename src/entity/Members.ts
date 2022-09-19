import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Members {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  pin: string;
}
