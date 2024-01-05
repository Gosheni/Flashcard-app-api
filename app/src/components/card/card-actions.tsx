import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import useMutationsCards from "@/hooks/use-mutations-cards";
import { EditCardDialog } from "./edit-card-dialog";
import { useState } from "react";

const CardActions = ({
  cardId,
  cardFront,
  cardBack,
}: {
  cardId: string;
  cardFront: string;
  cardBack: string;
}) => {
  const { removeCardById } = useMutationsCards();

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
        <EditCardDialog
          cardId={cardId}
          frontContent={cardFront}
          backContent={cardBack}
          openTrue={openTrue}
          openFalse={openFalse}
        />
        <DropdownMenuItem
          className="text-red-500"
          onClick={() => removeCardById(cardId)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CardActions;
