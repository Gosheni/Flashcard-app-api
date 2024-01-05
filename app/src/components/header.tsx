import { Button } from "./ui/button";

const Header = ({
  isDecksEnabled,
}: {
  isDecksEnabled: boolean;
}) => {
  return (
    <div className="flex justify-center gap-3 p-4 border-b-2 border-slate-400">
      <Button variant={"link"} disabled={!isDecksEnabled}>
        Decks
      </Button>
      <Button variant={"link"} disabled={isDecksEnabled}>
        Cards
      </Button>
    </div>
  );
};

export default Header;
