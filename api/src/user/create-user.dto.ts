import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @MinLength(3, { message: "Username is too short!" })
  @MaxLength(20, { message: "Username is too long!" })
  username: string;

  @IsString()
  @MinLength(8, { message: "Password is too short!" })
  password: string;

  @IsString()
  @MinLength(3, { message: "Display name is too short" })
  @MaxLength(30, { message: "Display name is too long" })
  displayName: string;

  @IsOptional()
  @IsString()
  avatar: string;
}
