import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/createAuthDto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("/signup")
    async signUp(@Body() createAuthDto: CreateAuthDto): Promise<void> {
        await this.authService.createUser(createAuthDto);
    }

    @Post("/signin")
    async signIn(
        @Body() createAuthDto: CreateAuthDto,
    ): Promise<{ accessToken: string }> {
        return this.authService.userLogin(createAuthDto);
    }
}
