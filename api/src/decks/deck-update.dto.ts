import { IsOptional, IsString } from "class-validator";

export class DeckUpdateDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
