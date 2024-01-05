import useQueryCards from "@/hooks/use-query-cards";
import Card from "./card";

const Cards = () => {
  const { cards } = useQueryCards();

  if (cards.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '500%' }}>
        <div style={{textAlign: 'center'}}>No cards yet</div> 
      </div>
    );    
  }

  return (
    <div>
      {cards.map((card) => (
        <Card card={card} key={card.id} />
      ))}
    </div>
  );
};

export default Cards;
