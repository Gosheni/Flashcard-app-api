import Header from "./header";
import Decks from "./deck/decks";
import { useStore } from "@/lib/store";

const Feed = ({ isDecksEnabled, setMode }: { isDecksEnabled: boolean; setMode: () => void }) => {
  const user = useStore((state) => state.user);

  return (
    <div className="flex flex-col w-full min-h-screen border-x-2 border-slate-400 md:max-w-xl">
      <Header isDecksEnabled={isDecksEnabled} />
      {user ? (
        <Decks isDecksEnabled={isDecksEnabled} setMode={setMode} />
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          Please login to view your decks or register to use this app
        </div>
      )}
    </div>
  );
};

export default Feed;
