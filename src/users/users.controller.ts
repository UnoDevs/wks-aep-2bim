import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersDTO } from './DTO/users.dto';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Get()
    find(){
        return this.usersService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: number){
        return this.usersService.find(id);
    }

    @Post()
    create(@Body() usersDTO: UsersDTO){
        return this.usersService.create(usersDTO);
    }

    @Delete(':id')
    async delete(@Param('id') id:number){
        return await this.usersService.delete(id);
    }
}
