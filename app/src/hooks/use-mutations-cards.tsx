import { createCard, deleteCard, editCard } from "@/lib/api";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";

function useMutationCards() {
  const { toast } = useToast();
  const addCard = useStore((state) => state.addCard);
  const editNewCard = useStore((state) => state.editNewCard);
  const removeCard = useStore((state) => state.removeCard);
  const selectedDeckId = useStore((state) => state.selectedDeckId);

  const addNewCard = async (front: string, back: string) => {
    try {
      const newCard = await createCard(selectedDeckId as string, front, back);
      addCard(newCard);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create the card",
        description:
          (error as Error).message ||
          "There was an error creating the card. Please try again later.",
      });
    }
  };

  const editCardById = async (id: string, front: string, back: string) => {
    try {
      await editCard(selectedDeckId as string, front, back, id);
      editNewCard(id, front, back);
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

  const removeCardById = async (id: string) => {
    try {
      await deleteCard(selectedDeckId as string, id);
      removeCard(id);
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

  return { addNewCard, editCardById, removeCardById };
}

export default useMutationCards;
