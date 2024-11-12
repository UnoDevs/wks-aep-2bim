import { Users } from "src/users/users.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Passwords {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    service: string;

    @Column()
    description: string;
    
    @Column()
    password: string;

    @Column()
    iv_structure: string;

    @Column({default: true})
    isActive: boolean;


    @ManyToOne(type => Users, user => user.password)
    user: Users;
}