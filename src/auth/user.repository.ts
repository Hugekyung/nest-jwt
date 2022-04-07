import { EntityRepository, Repository } from "typeorm";
import { CreateAuthDto } from "./dto/createAuthDto";
import { User } from "./user.entity";
import * as bcrypt from "bcryptjs";
import {
    ConflictException,
    InternalServerErrorException,
} from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(createAuthDto: CreateAuthDto): Promise<void> {
        const { username, password } = createAuthDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.create({ username, password: hashedPassword });

        try {
            await this.save(user);
        } catch (error) {
            if (error.code === "23505") {
                throw new ConflictException("Already exists username!");
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async findByUserName(username: string): Promise<User> {
        return await this.findOne({ username });
    }
}
