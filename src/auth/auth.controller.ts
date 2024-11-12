import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInDTO } from './DTO/singIn.dto';
import { AuthGuard } from './auth.guard';
import { Public } from './auth.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    singIn(@Body() singInDTO: SingInDTO){
        return this.authService.singIn(singInDTO.email,singInDTO.senha);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
