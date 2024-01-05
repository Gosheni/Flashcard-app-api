"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const deck_entity_1 = require("./deck.entity");
let DecksService = class DecksService {
    constructor(deckRepository) {
        this.deckRepository = deckRepository;
    }
    async findAll(offset, limit, search, userId, withUserData) {
        const queryBuilder = this.deckRepository.createQueryBuilder("decks");
        if (withUserData) {
            queryBuilder.leftJoinAndSelect("decks.user", "user");
        }
        let hasWhereCondition = false;
        if (search !== undefined) {
            queryBuilder.where(`decks.title ILIKE :search`, {
                search: `%${search}%`,
            });
            hasWhereCondition = true;
        }
        if (userId !== undefined) {
            if (hasWhereCondition) {
                queryBuilder.andWhere(`decks.userId = :userId`, {
                    userId,
                });
            }
            else {
                queryBuilder.where(`decks.userId = :userId`, {
                    userId,
                });
                hasWhereCondition = true;
            }
        }
        queryBuilder.limit(limit);
        queryBuilder.offset(offset);
        queryBuilder.orderBy("decks.createdAt", "DESC");
        const deck = await queryBuilder.getMany();
        return deck;
    }
    async findOne(id, withUserData) {
        const relations = [];
        if (withUserData) {
            relations.push("user");
        }
        return this.deckRepository.findOne({
            where: { id },
            relations,
        });
    }
    async create(deckCreateDto, userId) {
        const deck = await this.deckRepository.create({
            ...deckCreateDto,
            userId,
        });
        return this.deckRepository.save(deck);
    }
    async update(id, deckUpdateDto) {
        const deck = await this.deckRepository.preload({ id, ...deckUpdateDto });
        if (!deck) {
            return null;
        }
        deck.updatedAt = new Date();
        return this.deckRepository.save(deck);
    }
    async remove(id) {
        const deck = await this.findOne(id);
        if (!deck) {
            return null;
        }
        return this.deckRepository.remove(deck);
    }
    async incrementCardCounter(id) {
        const deck = await this.findOne(id);
        if (!deck) {
            return null;
        }
        deck.numCards += 1;
        await this.deckRepository.save(deck);
        return deck;
    }
    async decrementCardCounter(id) {
        const deck = await this.findOne(id);
        if (!deck) {
            return null;
        }
        deck.numCards -= 1;
        await this.deckRepository.save(deck);
        return deck;
    }
};
exports.DecksService = DecksService;
exports.DecksService = DecksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(deck_entity_1.Deck)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DecksService);
//# sourceMappingURL=decks.service.js.map