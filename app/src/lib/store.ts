import { CardWithDeckData, DeckWithUserData, User } from "./types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  decks: DeckWithUserData[];
  cards: CardWithDeckData[];
  user: User | null;
  selectedDeckId: string | null;
};

type Action = {
  setDecks: (decks: DeckWithUserData[]) => void;
  removeDeck: (id: string) => void;
  addDeck: (deck: DeckWithUserData) => void;
  editNewDeck: (id: string, title: string) => void;
  setUser: (user: User) => void;
  clearUser: () => void;
  setCards: (cards: CardWithDeckData[]) => void;
  addCard: (card: CardWithDeckData) => void;
  editNewCard: (id: string, front: string, back: string) => void;
  removeCard: (id: string) => void;
  clearCards: () => void;
  setSelectedDeckId: (id: string) => void;
  clearSelectedDeckId: () => void;
};

// define the initial state
const initialState: State = {
  decks: [],
  cards: [],
  user: null,
  selectedDeckId: null,
};

export const useStore = create<State & Action>()(
  immer((set, get) => ({
    ...initialState,

    setDecks: (decks) => set({ decks }),

    removeDeck: (id) => {
      const newDecks = get().decks.filter((deck) => deck.id !== id);
      set({ decks: newDecks });
    },

    addDeck: (deck) => {
      const newDecks = [deck, ...get().decks];
      set({ decks: newDecks });
    },

    editNewDeck: (id, title) => {
      const deckToEdit = get().decks.find((deck) => deck.id === id);
      if (deckToEdit) {
        deckToEdit.title = title;
      }
      set({ decks: get().decks });
    },

    setUser: (user) => set({ user }),

    clearUser: () => set({ user: null }),

    setCards: (cards) => set({ cards }),

    addCard: (card) => {
      set({ 
        cards: [card, ...get().cards],
        decks: get().decks.map((deck) => {
          if (deck.id === card.deckId) {
            return {
              ...deck,
              numCards: deck.numCards + 1,
            };
          }
          return deck;
        }),
      });
    },

    editNewCard: (id, front, back) => {
      const cardToEdit = get().cards.find((card) => card.id === id);
      if (cardToEdit) {
        cardToEdit.front = front;
        cardToEdit.back = back;
      }
      set({ decks: get().decks });
    },

    removeCard: (id) => {
      const newCards = get().cards.filter((card) => card.id !== id);
      set({ cards: newCards });
    },

    clearCards: () => set({ cards: [] }),

    setSelectedDeckId: (id) => set({ selectedDeckId: id }),

    clearSelectedDeckId: () => set({ selectedDeckId: null }),
  })),
);
