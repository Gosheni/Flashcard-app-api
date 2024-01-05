import { Injectable } from "@nestjs/common";
import { ILike, Repository } from "typeorm";
import { Card } from "./card.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCardDto } from "./card-create.dto";
import { DecksService } from "src/decks/decks.service";
import { CardUpdateDto } from "./card-update.dto";

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    private readonly decksService: DecksService,
  ) {}

  // TODO: Add operations
  // Creates a new instance of the Card entity and saves it to the database.
  // Returns the newly created card.
  async create(
    createCardDto: CreateCardDto,
    deckId: string,
    userId: number,
  ): Promise<Card> {
    const card = this.cardRepository.create({
      ...createCardDto,
      deckId, // Associate the card with a deck
      userId, // Associate the card with a user
    });

    // Increment the card counter in the associated deck
    await this.decksService.incrementCardCounter(deckId);

    return this.cardRepository.save(card);
  }

  // Returns all cards that match the given criteria.
  async findAll(
    limit: number,
    offset: number,
    deckId?: string,
    userId?: number,
    search?: string,
    withUserData?: boolean,
    withDeckData?: boolean,
  ): Promise<Card[]> {
    const front = search ? ILike(`%${search}%`) : undefined;
    const back = search ? ILike(`%${search}%`) : undefined;
    const relations = [];

    if (withUserData) {
      relations.push("user");
    }

    if (withDeckData) {
      relations.push("deck");
    }

    const cards = await this.cardRepository.find({
      take: limit,
      skip: offset,
      where: [
        {
          deckId,
          userId,
          front,
          back,
        },
      ],
      order: {
        createdAt: "DESC",
      },
      relations,
    });

    return cards;
  }

  async findOne(id: string): Promise<Card | null> {
    return this.cardRepository.findOneBy({ id });
  }

  async update(id: string, cardUpdateDto: CardUpdateDto): Promise<Card | null> {
    const card = await this.cardRepository.preload({ id, ...cardUpdateDto });
    if (!card) {
      return null;
    }
    card.updatedAt = new Date();
    return this.cardRepository.save(card);
  }

  async remove(id: string, deckId: string): Promise<Card | null> {
    const card = await this.findOne(id);
    if (!card) {
      return null;
    }

    // Increment the card counter in the associated deck
    await this.decksService.decrementCardCounter(deckId);

    return this.cardRepository.remove(card);
  }
}
