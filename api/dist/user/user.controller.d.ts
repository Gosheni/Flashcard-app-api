import { CreateUserDto } from "./create-user.dto";
import { UserResponseDto } from "./user-response.dto";
import { UserService } from "./user.service";
import { AuthService } from "src/auth/auth.service";
import { UserLoginDTO } from "./user-login.dto";
export declare class UserController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
    login(userDto: UserLoginDTO): Promise<{
        access_token: string;
    }>;
    createUser(userDto: CreateUserDto): Promise<UserResponseDto>;
}
