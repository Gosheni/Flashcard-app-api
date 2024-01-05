export type User = {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
};

export type Deck = {
  id: string;
  title: string;
  image?: string;
  numCards: number;
};

export type Card = {
  id: string;
  front: string;
  back: string;
  createdAt: Date;
  updatedAt: Date;
  deckId: string;
};

export type DeckWithUserData = Deck & { user?: User };

export type CardWithDeckData = Card & { deck?: Deck };
