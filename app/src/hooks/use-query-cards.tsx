import { useToast } from "@/components/ui/use-toast";
import { fetchCards } from "@/lib/api";
import { useStore } from "@/lib/store";
import { useEffect } from "react";

function useQueryCards() {
  const { toast } = useToast();
  const [cards, setCards] = useStore((state) => [state.cards, state.setCards]);
  const clearCards = useStore((state) => state.clearCards);
  const selectedDeckId = useStore((state) => state.selectedDeckId);

  const loadCards = async () => {
    try {
      const fetchedCards = await fetchCards(selectedDeckId as string);
      setCards(fetchedCards);
    } catch (error) {
      clearCards();
      toast({
        variant: "destructive",
        title: "Failed to fetch cards",
        description:
          (error as Error).message ||
          "There was an error loading the cards. Please try again later.",
      });
    }
  };

  useEffect(() => {
    if (selectedDeckId) {
      loadCards();
    } else {
      clearCards();
    }
  }, [selectedDeckId]);

  return { cards };
}

export default useQueryCards;
