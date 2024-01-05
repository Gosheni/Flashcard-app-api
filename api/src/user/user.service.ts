import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./create-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    // we need to look up the user with the given username
    // in the database
    return this.userRepository.findOneBy({ username });
  }

  async createUser(userDto: CreateUserDto): Promise<User> {
    const { password, ...userInfo } = userDto;
    const user = await this.userRepository.create({
      ...userInfo,
      password: await bcrypt.hash(password, 10),
    });
    return this.userRepository.save(user);
  }
}
