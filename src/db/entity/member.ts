import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  grade: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  pin: string;
}
