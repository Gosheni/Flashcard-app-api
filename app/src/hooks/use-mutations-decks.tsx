import { createDeck, deleteDeck, editDeck } from "@/lib/api";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";

function useMutationsDecks() {
  const { toast } = useToast();
  const removeDeck = useStore((state) => state.removeDeck);
  const addDeck = useStore((state) => state.addDeck);
  const editNewDeck = useStore((state) => state.editNewDeck);

  const removeDeckById = async (deckId: string) => {
    try {
      await deleteDeck(deckId);
      removeDeck(deckId);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete the deck",
        description:
          (error as Error).message ||
          "There was an error deleting the deck. Please try again later.",
      });
    }
  };

  const makeNewDeck = async (title: string, image?: string) => {
    try {
      const newDeck = await createDeck(title, image);
      addDeck(newDeck);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create the deck",
        description:
          (error as Error).message ||
          "There was an error creating the deck. Please try again later.",
      });
    }
  };

  const editDeckById = async (id: string, title: string) => {
    try {
      await editDeck(id, title);
      editNewDeck(id, title);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to edit the deck",
        description:
          (error as Error).message ||
          "There was an error editing the deck. Please try again later.",
      });
    }
  };

  return { removeDeckById, makeNewDeck, editDeckById };
}

export default useMutationsDecks;
