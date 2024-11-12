import { Module } from '@nestjs/common';
import { PasswordsController } from './passwords.controller';
import { PasswordsService } from './passwords.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Passwords } from './passwords.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Passwords])],
  controllers: [PasswordsController],
  providers: [PasswordsService]
})
export class PasswordsModule {}
