import { IsNotEmpty, IsString } from "class-validator";

export class CardUpdateDto {
  @IsNotEmpty({ message: "Front content cannot be empty" })
  @IsString()
  front: string;

  @IsNotEmpty({ message: "Back content cannot be empty" })
  @IsString()
  back: string;
}
