import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Deck } from "./deck.entity";
import { DeckCreateDto } from "./deck-create.dto";
import { DeckUpdateDto } from "./deck-update.dto";

@Injectable()
export class DecksService {
  constructor(
    @InjectRepository(Deck)
    private deckRepository: Repository<Deck>,
  ) {}

  // We'll add methods for handling CRUD operations here
  async findAll(
    offset: number,
    limit: number,
    search?: string,
    userId?: number,
    withUserData?: boolean,
  ): Promise<Deck[]> {
    const queryBuilder = this.deckRepository.createQueryBuilder("decks");

    if (withUserData) {
      queryBuilder.leftJoinAndSelect("decks.user", "user");
    }

    let hasWhereCondition = false;

    if (search !== undefined) {
      // SELECT * decks WHERE content LIKE $search
      queryBuilder.where(`decks.title ILIKE :search`, {
        search: `%${search}%`,
      });
      hasWhereCondition = true;
    }

    if (userId !== undefined) {
      if (hasWhereCondition) {
        // SELECT * decks WHERE userId=$userId
        queryBuilder.andWhere(`decks.userId = :userId`, {
          userId,
        });
      } else {
        queryBuilder.where(`decks.userId = :userId`, {
          userId,
        });
        hasWhereCondition = true;
      }
    }

    // SELECT * decks WHERE userId=$userId AND content LIKE $search

    queryBuilder.limit(limit);
    queryBuilder.offset(offset);
    queryBuilder.orderBy("decks.createdAt", "DESC");

    const deck = await queryBuilder.getMany();
    return deck;
  }

  async findOne(id: string, withUserData?: boolean): Promise<Deck | null> {
    const relations = [];

    if (withUserData) {
      relations.push("user");
    }

    return this.deckRepository.findOne({
      where: { id },
      relations,
    });
  }

  async create(deckCreateDto: DeckCreateDto, userId: number): Promise<Deck> {
    const deck = await this.deckRepository.create({
      ...deckCreateDto,
      userId,
    });
    return this.deckRepository.save(deck);
  }

  async update(id: string, deckUpdateDto: DeckUpdateDto): Promise<Deck | null> {
    const deck = await this.deckRepository.preload({ id, ...deckUpdateDto });
    if (!deck) {
      return null;
    }
    deck.updatedAt = new Date();
    return this.deckRepository.save(deck);
  }

  async remove(id: string): Promise<Deck | null> {
    const deck = await this.findOne(id);
    if (!deck) {
      return null;
    }
    return this.deckRepository.remove(deck);
  }

  async incrementCardCounter(id: string): Promise<Deck | null> {
    const deck = await this.findOne(id);
    if (!deck) {
      return null;
    }
    deck.numCards += 1;
    await this.deckRepository.save(deck);
    return deck;
  }

  async decrementCardCounter(id: string): Promise<Deck | null> {
    const deck = await this.findOne(id);
    if (!deck) {
      return null;
    }
    deck.numCards -= 1;
    await this.deckRepository.save(deck);
    return deck;
  }
}
