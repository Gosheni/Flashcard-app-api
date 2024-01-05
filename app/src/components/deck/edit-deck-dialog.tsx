import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useMutationsDecks from "@/hooks/use-mutations-decks";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useStore } from "@/lib/store";

export const EditDeckDialog = ({
  deckId,
  deckTitle,
  openTrue,
  openFalse,
}: {
  deckId: string;
  deckTitle: string;
  openTrue: () => void;
  openFalse: () => void;
}) => {
  const [title, setTitle] = useState(deckTitle);
  const { toast } = useToast();
  const { editDeckById } = useMutationsDecks();
  const user = useStore((state) => state.user);

  const [open, setOpen] = useState(false);

  const handleSave = async () => {
    if (!title) {
      toast({
        variant: "destructive",
        title: "Sorry! Title cannot be empty! 🙁",
        description: `Please enter the title for your deck.`,
      });
      return;
    }
    await editDeckById(deckId, title);
    setTitle("");
    setOpen(false);
    openFalse();
  };

  const handleCancel = () => {
    setTitle("");
    setOpen(false);
    openFalse();
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen);
      if (!newOpen && open) {
        handleCancel();
      }
    }}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onClick={(event) => {
            setOpen(true);
            openTrue();
            event.preventDefault();
          }}>
          Edit
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" onClick={(event) => {
        event.preventDefault();
      }}>
        <DialogHeader>
          <DialogTitle>Edit Deck</DialogTitle>
          <DialogDescription>Give a title to your deck here.</DialogDescription>
        </DialogHeader>
        {user && (
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              className="col-span-3"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
        </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"} type="reset" onClick={(event) => { 
              handleCancel();
              event.preventDefault();
            }}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" onClick={(event) => {
              handleSave();
              event.preventDefault();
            }}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
