import useQueryDecks from "@/hooks/use-query-decks";
import Deck from "./deck";

const Decks = ({ isDecksEnabled, setMode }: { isDecksEnabled: boolean; setMode: () => void }) => {
  const { decks } = useQueryDecks();

  return (
    <div className="">
      {isDecksEnabled && decks.map((deck) => (
        <div key={deck.id}>
          <Deck deck={deck} isDecksEnabled={isDecksEnabled} setMode={setMode}/>
        </div>
      ))}
    </div>
  );
};

export default Decks;
