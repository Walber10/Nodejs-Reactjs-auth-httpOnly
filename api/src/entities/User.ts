import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
} from "typeorm";

@Entity("user")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar" })
  firstName: string;

  @Column({ type: "varchar" })
  lastName: string;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "varchar",  })
  password: string;

  @Column({ type: "int", unique: true, })
  mobile: number;

  @Column({ type: "boolean", default: false })
  verified: boolean;

  @Column({ type: "varchar", nullable: true })
  resetPasswordToken: string;

  @CreateDateColumn()
  createdAt?: Date;

}
