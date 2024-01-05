import { Button } from "../ui/button";
import { ChevronsRight } from "lucide-react";
import DeckActions from "./deck-actions";
import type { DeckWithUserData } from "@/lib/types";
import { useStore } from "@/lib/store";
import { Link } from "react-router-dom";

const Deck = ({ deck, isDecksEnabled, setMode }: { deck: DeckWithUserData; isDecksEnabled: boolean; setMode: () => void }) => {
  const { id, title, numCards } = deck;
  const setSelectedDeckId = useStore((state) => state.setSelectedDeckId);

  const numberOfStackedCards = 3;

  return (
    <div className="flex flex-col justify-center items-center border-b border-slate-400 w-112 h-96">
      <div className={`bg-white p-4 shadow-lg border w-96 h-72 absolute rounded-lg ${isDecksEnabled ? '' : 'hidden'}`}>
        <div className="text-xl font-semibold flex justify-between m-2">
          <span>{title}</span>
          <DeckActions deckId={id} deckTitle={title} />
        </div>
        <div className="text-gray-600 justify-between m-2">
          {numCards} cards
        </div>
        <div className={"flex justify-end items-end mt-36"}>
          <Link to={`decks/${deck.id}`} onClick={() => setSelectedDeckId(deck.id)}>
            <Button variant="ghost" size="icon" onClick={setMode}>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {isDecksEnabled && Array.from({ length: numberOfStackedCards }).map((_, index) => (
        <div
          key={index}
          className={"bg-white shadow-lg border w-96 h-72 absolute rounded-lg"}
          style={{
            transform: `translate(${index * 5}px, ${index * 5}px)`,
            zIndex: -index - 1,
          }}
        >
          {/* Add content for each stacked card if needed */}
        </div>
      ))}
    </div>
  );
};

export default Deck;
