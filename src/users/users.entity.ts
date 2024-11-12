import { Passwords } from "src/passwords/passwords.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({default: true})
    isActive: boolean;

    @OneToMany(() => Passwords, (password) => password.user)
    passwords: Passwords[];
}