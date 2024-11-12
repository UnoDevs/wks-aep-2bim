import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Passwords } from './passwords.entity';
import { Repository } from 'typeorm';
import { PasswordsDTO } from './DTO/passwords.dto';
import { Users } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { decryptText, encryptText } from 'src/util/crypto.util';
import { crypPass } from './constants';

@Injectable()
export class PasswordsService {
    constructor(
        @InjectRepository(Passwords)
        private passwordsRepository: Repository<Passwords>,
    ) {}

    async findAll(): Promise<Passwords[]> {
       let passCryptos: Passwords[] = await this.passwordsRepository.find();
       const passHard = this.convertPassword(passCryptos);
       return passHard;
    }

    async findAllByUser(id: number){
        let passCryptos: Passwords[] = await this.passwordsRepository.find({
            where: {
                user: {id}
            }
        });
        const passHard = this.convertPassword(passCryptos);
        return passHard;
    }

    find(id: number): Promise<Passwords> {
        return this.passwordsRepository.findOneBy({id});
    }

    async create(passwordDTO: PasswordsDTO) {
        const {userId,name,service,password,description} = passwordDTO;
        
        const criptedJson = await encryptText(password,crypPass.secretPass);
        const {iv,cripPass} = criptedJson;

        const pass = this.passwordsRepository.create({
            name,
            service,
            description,
            iv_structure: iv,
            password: cripPass,
            user: {id: userId}
        });

        return  this.passwordsRepository.save(pass);
    }

    async delete(id: number) {
        return await this.passwordsRepository.delete(id);
    }

    private async convertPassword(passCryptos: Passwords[]){
        let passHard = [];
       for (const passCrypto of passCryptos) {
        const hardPass = await decryptText({iv: passCrypto.iv_structure, encryptedText: passCrypto.password}, crypPass.secretPass);
        passHard.push({
            "name": passCrypto.name,
            "service": passCrypto.service,
            "password": hardPass,
            "description": passCrypto.description,
            "isActive": passCrypto.isActive
        })
       }
       return passHard;
    }
}
