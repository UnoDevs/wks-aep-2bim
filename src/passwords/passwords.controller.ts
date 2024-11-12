import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordsService } from './passwords.service';
import { PasswordsDTO } from './DTO/passwords.dto';

@Controller('passwords')
export class PasswordsController {
    constructor (private passService: PasswordsService){}

    @Get()
    find(){
        return this.passService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: number){
        return this.passService.find(id);
    }

    @Get('user/:id')
    findByUser(@Param('id') id: number){
        return this.passService.findAllByUser(id);
    }

    @Post()
    create(@Body() passDTO: PasswordsDTO){
        return this.passService.create(passDTO);
    }

    @Delete(':id')
    async delete(@Param('id') id:number){
        return await this.passService.delete(id);
    }
}
