import Aside from "@/components/aside";
import Cards from "@/components/card/cards";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import useQueryDecks from "@/hooks/use-query-decks";
import { useStore } from "@/lib/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const CardView = ({ 
  isDecksEnabled, setToCard, setToDeck 
}: { 
  isDecksEnabled: boolean; setToCard: () => void; setToDeck: () => void
}) => {
  const { deckId } = useParams();
  const { deck, loadDeck } = useQueryDecks();
  const selectedDeckId = useStore((state) => state.selectedDeckId);

  useEffect(() => {
    if (deckId) {
      loadDeck(deckId);
    }
  }, [deckId]);

  setToCard();

  return (
    <>
      <Sidebar isDecksEnabled={isDecksEnabled} setToDeck={setToDeck} />
      <div className="flex flex-col w-full min-h-screen border-x-2 border-slate-400 md:max-w-xl">
        <Header isDecksEnabled={isDecksEnabled} />
        {deck && selectedDeckId && <Cards />}
      </div>
      <Aside setToDeck={setToDeck} />
    </>
  );
};

export default CardView;
