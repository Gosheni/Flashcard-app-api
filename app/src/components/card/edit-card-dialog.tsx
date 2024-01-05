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
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useStore } from "@/lib/store";
import { Textarea } from "../ui/textarea";
import useMutationsCards from "@/hooks/use-mutations-cards";

export const EditCardDialog = ({
  cardId,
  frontContent,
  backContent,
  openTrue,
  openFalse,
}: {
  cardId: string;
  frontContent: string;
  backContent: string;
  openTrue: () => void;
  openFalse: () => void;
}) => {
  const [front, setFront] = useState(frontContent);
  const [back, setBack] = useState(backContent);
  const { toast } = useToast();
  const { editCardById } = useMutationsCards();
  const user = useStore((state) => state.user);

  const [open, setOpen] = useState(false);

  const handleSave = async () => {
    if (!front || !back) {
      toast({
        variant: "destructive",
        title: "Sorry! Content cannot be empty! 🙁",
        description: `Please provide the content for your card.`,
      });
      return;
    }
    await editCardById(cardId, front, back);
    setFront("");
    setBack("");
    setOpen(false);
    openFalse();
  };

  const handleCancel = () => {
    setFront("");
    setBack("");
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
          <DialogDescription>Edit your card here.</DialogDescription>
        </DialogHeader>
        {user && (
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Textarea
                id="front"
                value={front}
                className="col-span-3"
                onChange={(e) => {
                  setFront(e.target.value);
                }}
              />
              <Textarea
                id="back"
                value={back}
                className="col-span-3"
                onChange={(e) => {
                  setBack(e.target.value);
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
