import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import useMutationsDecks from "@/hooks/use-mutations-decks";
import { EditDeckDialog } from "./edit-deck-dialog";
import { useState } from "react";

const DeckActions = ({
  deckId,
  deckTitle,
}: {
  deckId: string;
  deckTitle: string;
}) => {
  const { removeDeckById } = useMutationsDecks();

  // State to control the dialog's open/close state
  const [menuOpen, setMenuOpen] = useState(false);

  const openTrue = () => {
    setMenuOpen(true);
  }

  const openFalse = () => {
    setMenuOpen(false);
  }

  return (
    <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <DotsVerticalIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <EditDeckDialog
          deckId={deckId}
          deckTitle={deckTitle}
          openTrue={openTrue}
          openFalse={openFalse}
        />
        <DropdownMenuItem
          className="text-red-500"
          onClick={() => removeDeckById(deckId)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DeckActions;
