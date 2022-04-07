import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/createAuthDto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post()
    signup(@Body() createAuthDto: CreateAuthDto) {
        return this.authService.createUser(createAuthDto);
    }
}
