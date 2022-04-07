import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateAuthDto } from "./dto/createAuthDto";
import { UserRepository } from "./userRepository";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async createUser(createAuthDto: CreateAuthDto): Promise<void> {
        return await this.userRepository.createUser(createAuthDto);
    }
}
