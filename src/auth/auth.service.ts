import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateAuthDto } from "./dto/createAuthDto";
import { UserRepository } from "./user.repository";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async createUser(createAuthDto: CreateAuthDto): Promise<void> {
        await this.userRepository.createUser(createAuthDto);
    }

    async userLogin(
        createAuthDto: CreateAuthDto,
    ): Promise<{ accessToken: string }> {
        const { username, password } = createAuthDto;

        // select by username
        const user = await this.userRepository.findByUserName(username);
        if (!user) {
            throw new Error(`User ${username} not found`);
        }

        // confirm password
        const checkedPassword = await bcrypt.compare(password, user.password);
        if (!checkedPassword) {
            throw new Error(`Password not equal`);
        }

        const payload = { username };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
    }
}
