import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { UsersDTO } from './DTO/users.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>
    ) {}

    findAll(): Promise<Users[]> {
        return this.usersRepository.find();
    }

    find(id: number): Promise<Users> {
        return this.usersRepository.findOneBy({id});
    }

    findByEmail(email: string): Promise<Users> {
        return this.usersRepository.findOneBy({email});
    }

    create(usersDTO: UsersDTO) {
        const user = this.usersRepository.create(usersDTO)
        return this.usersRepository.save(user);
    }

    async delete(id: number) {
        return await this.usersRepository.delete(id);
    }
}
