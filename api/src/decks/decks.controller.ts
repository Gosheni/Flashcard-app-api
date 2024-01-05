import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { UserId } from "src/decorators/user-id.decorator";
import { DecksService } from "./decks.service";
import { DeckCreateDto } from "./deck-create.dto";
import { DeckUpdateDto } from "./deck-update.dto";
import { DeckResponseDto } from "./deck-response.dto";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { DeckOwnershipGuard } from "src/guards/deck-owner.guard";
import { UserService } from "src/user/user.service";
import { FindDecksQueryDto } from "./find-decks-query.dto";
import { FindDecksResponseDto } from "./find-decks-response.dto";

@Controller("decks")
export class DecksController {
  constructor(
    private readonly decksService: DecksService,
    private readonly userService: UserService,
  ) {}

  // We will add handlers for CRUD endpoints here
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @UserId() loginUserId: number,
    @Query() query: FindDecksQueryDto,
  ): Promise<FindDecksResponseDto> {
    const { limit, offset, search, username, withUserData } = query;
    let userId: number | undefined;

    if (username) {
      const user = await this.userService.findOne(username);
      if (!user) {
        throw new NotFoundException(`User with username ${username} not found`);
      }
      userId = user.id;
    }

    const decks = await this.decksService.findAll(
      offset,
      limit,
      search,
      userId,
      withUserData,
    );
    const filteredDecks = decks.filter((deck) => deck.userId === loginUserId);

    return {
      limit,
      offset,
      search,
      username,
      withUserData,
      data: filteredDecks.map((deck) => {
        delete deck.userId;
        if (deck.user) {
          delete deck.user.password;
        }
        return deck as DeckResponseDto;
      }),
    };
  }

  @UseGuards(JwtAuthGuard, DeckOwnershipGuard)
  @Get(":id")
  async findOne(
    @Param("id") id: string,
    @Query("withUserData") withUserData?: boolean,
  ): Promise<DeckResponseDto> {
    const deck = await this.decksService.findOne(id, withUserData);
    if (!deck) {
      throw new NotFoundException(`Deck with ID ${id} not found`);
    }
    delete deck.userId;
    if (withUserData) {
      delete deck.user.password;
    }
    return deck;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() deckCreateDto: DeckCreateDto,
    @UserId() userId: number,
  ): Promise<DeckResponseDto> {
    const deck = await this.decksService.create(deckCreateDto, userId);
    delete deck.userId;
    return deck;
  }

  @UseGuards(JwtAuthGuard, DeckOwnershipGuard)
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() deckUpdateDto: DeckUpdateDto,
    @UserId() userId: number,
  ): Promise<{ statusCode: number; message: string; data: DeckResponseDto }> {
    let deck = await this.decksService.findOne(id);

    if (!deck) {
      throw new NotFoundException(`Deck with ID ${id} not found`);
    } else if (deck.userId !== userId) {
      throw new ForbiddenException();
    }

    deck = await this.decksService.update(id, deckUpdateDto);
    delete deck.userId;
    return {
      statusCode: 200,
      message: "Deck updated successfully",
      data: deck,
    };
  }

  @UseGuards(JwtAuthGuard, DeckOwnershipGuard)
  @Delete(":id")
  async remove(
    @Param("id") id: string,
    @UserId() userId: number,
  ): Promise<{ statusCode: number; message: string; data: DeckResponseDto }> {
    let deck = await this.decksService.findOne(id);

    if (!deck) {
      throw new NotFoundException(`Deck with ID ${id} not found`);
    } else if (deck.userId !== userId) {
      throw new ForbiddenException();
    }

    deck = await this.decksService.remove(id);
    delete deck.userId;
    return {
      statusCode: 200,
      message: "Deck deleted successfully",
      data: deck,
    };
  }
}
