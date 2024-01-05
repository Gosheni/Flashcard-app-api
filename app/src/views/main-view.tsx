import Aside from "@/components/aside";
import Feed from "@/components/feed";
import Sidebar from "@/components/sidebar";
import { useStore } from "@/lib/store";
import { useEffect } from "react";

const MainView = ({ isDecksEnabled, setToDeck, setMode }: { isDecksEnabled: boolean; setToDeck: () => void; setMode: () => void }) => {
  const clearSelectedDeckId = useStore((state) => state.clearSelectedDeckId);

  useEffect(() => {
    clearSelectedDeckId();
  }, []);
  
  return (
    <>
      <Sidebar isDecksEnabled={isDecksEnabled} setToDeck={setToDeck} />
      <Feed isDecksEnabled={isDecksEnabled} setMode={setMode} />
      <Aside setToDeck={setToDeck} />
    </>
  );
};

export default MainView;
