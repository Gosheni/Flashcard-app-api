import { CardResponseDto } from "./card-response.dto";

export class FindCardsResponseDto {
  limit: number;
  offset: number;
  search?: string;
  withDeckData?: boolean;
  withUserData?: boolean;
  data: CardResponseDto[];
}
