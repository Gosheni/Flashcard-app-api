import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { UserResponseDto } from "src/user/user-response.dto";
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<UserResponseDto | null>;
    login(user: UserResponseDto): Promise<{
        access_token: string;
    }>;
}
