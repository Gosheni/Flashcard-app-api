import { Deck } from "src/decks/deck.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  displayName: string;

  @Column({ nullable: true })
  avatar: string;

  // You can add more columns as required
  @OneToMany(() => Deck, (deck) => deck.user)
  decks: Deck[];
}
