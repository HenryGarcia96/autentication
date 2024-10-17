import { Body, Controller, Post } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Models } from 'appwrite';
import { RescuePassAuthDto } from './dto/rescue-pass.dto';
import { ChangePassAuthDto } from './dto/change-pass.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('signup')
    async signup(@Body() createAuthDto: CreateAuthDto): Promise <User>{
        return this.authService.signup(createAuthDto);
    }

    @Post('login')
    async login(@Body() loginAuthDto: LoginAuthDto): Promise <Models.Session>{
        return this.authService.login(loginAuthDto);
    }

    @Post('rescue-password')
    async rescue(@Body() rescueAuthDto: RescuePassAuthDto): Promise <Models.Token>{
        return this.authService.rescuepass(rescueAuthDto);
    }

    @Post('change-password')
    async change(@Body() changeAuthDto: ChangePassAuthDto): Promise <Models.Token>{
        return this.authService.changepass(changeAuthDto);
    }
}
