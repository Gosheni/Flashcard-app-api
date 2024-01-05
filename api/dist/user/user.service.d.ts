import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./create-user.dto";
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findOne(username: string): Promise<User | undefined>;
    createUser(userDto: CreateUserDto): Promise<User>;
}
