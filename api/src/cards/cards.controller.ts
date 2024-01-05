import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { CardsService } from "./cards.service";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { CardResponseDto } from "./card-response.dto";
import { CreateCardDto } from "./card-create.dto";
import { UserId } from "src/decorators/user-id.decorator";
import { FindCardsQueryDto } from "./find-cards-query.dto";
import { FindCardsResponseDto } from "./find-cards-response.dto";
import { CardUpdateDto } from "./card-update.dto";

@UseGuards(JwtAuthGuard)
@Controller("decks/:deckId/cards")
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  async create(
    @Body() createCardDto: CreateCardDto,
    @Param("deckId") deckId: string,
    @UserId() userId: number,
  ): Promise<CardResponseDto> {
    return await this.cardsService.create(createCardDto, deckId, userId);
  }

  @Get()
  async findAll(
    @Param("deckId") deckId: string,
    @Query() query: FindCardsQueryDto,
  ): Promise<FindCardsResponseDto> {
    const { limit, offset, search, withDeckData, withUserData } = query;

    const cards = await this.cardsService.findAll(
      limit,
      offset,
      deckId,
      undefined,
      search,
      withUserData,
      withDeckData,
    );

    return {
      limit,
      offset,
      search,
      withUserData,
      withDeckData,
      data: cards.map((card) => {
        if (withUserData) {
          delete card.user.password;
        }
        return card;
      }),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<CardResponseDto> {
    const card = await this.cardsService.findOne(id);
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    delete card.userId;
    return card;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() cardUpdateDto: CardUpdateDto,
    @UserId() userId: number,
  ): Promise<{ statusCode: number; message: string; data: CardResponseDto }> {
    let card = await this.cardsService.findOne(id);

    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    } else if (card.userId !== userId) {
      throw new ForbiddenException();
    }

    card = await this.cardsService.update(id, cardUpdateDto);
    delete card.userId;
    return {
      statusCode: 200,
      message: "Card updated successfully",
      data: card,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async remove(
    @Param("id") id: string,
    @Param("deckId") deckId: string,
    @UserId() userId: number,
  ): Promise<{ statusCode: number; message: string; data: CardResponseDto }> {
    let card = await this.cardsService.findOne(id);

    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    } else if (card.userId !== userId) {
      throw new ForbiddenException();
    }

    card = await this.cardsService.remove(id, deckId);
    delete card.userId;
    return {
      statusCode: 200,
      message: "Card deleted successfully",
      data: card,
    };
  }
}
