import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtPass } from 'src/passwords/constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtPass.secret,
      signOptions: {expiresIn: '3600s'}
    })
  ],
  exports: [AuthService]
})
export class AuthModule {}
