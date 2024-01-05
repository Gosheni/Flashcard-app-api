import { useState } from "react";
import type { CardWithDeckData } from "@/lib/types";
import CardActions from "./card-actions";

const Card = ({ card }: { card: CardWithDeckData }) => {
  const { id, front, back } = card;

  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center border-b border-slate-400 w-112 h-96">
      <div
        className={`relative flex items-center justify-center border-2 border-gray-600 rounded-lg cursor-pointer shadow-lg ${isFlipped ? "flipped" : ""}`}
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ width: "375px", height: "275px" }}
      >
        <div className="w-full h-full p-4 relative">
          <div className="absolute top-0 right-[-42px]">
            <CardActions cardId={id} cardFront={front} cardBack={back} />
          </div>
          <div className={`absolute inset-0 flex items-center justify-center ${isFlipped ? "hidden" : ""}`}>{front}</div>
          <div className={`absolute inset-0 items-center justify-center ${isFlipped ? "flex" : "hidden"} bg-black text-white rounded`}>
            {back}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
