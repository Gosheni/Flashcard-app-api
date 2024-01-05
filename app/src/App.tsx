import MainView from "./views/main-view";
import { Toaster } from "./components/ui/toaster";
import { useStore } from "./lib/store";
import { useEffect, useState } from "react";
import {
  getAuthenticatedUserToken,
  isTokenExpired,
  removeAuthenticatedUserToken,
} from "./lib/auth";
import { useToast } from "./components/ui/use-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./views/error-page";
import CardView from "./views/card-view";

function App() {
  const clearUser = useStore((state) => state.clearUser);
  const { toast } = useToast();

  // State to manage the enabled/disabled state of Decks and Cards
  const [isDecksEnabled, setIsDecksEnabled] = useState(true);

  // Toggle the state when Chevron Button is clicked
  const switchClick = () => {
    setIsDecksEnabled(!isDecksEnabled);
  };

  const setToDeck = () => {
    setIsDecksEnabled(true);
  };

  const setToCard = () => {
    setIsDecksEnabled(false);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainView isDecksEnabled={isDecksEnabled} setToDeck={setToDeck} setMode={switchClick}/>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/decks/:deckId",
      element: <CardView isDecksEnabled={isDecksEnabled} setToCard={setToCard} setToDeck={setToDeck}/>,
      errorElement: <ErrorPage />,
    },
  ]);  

  useEffect(() => {
    const token = getAuthenticatedUserToken();
    if (token) {
      const isExpired = isTokenExpired(token);
      if (isExpired) {
        removeAuthenticatedUserToken();
        clearUser();
        toast({
          variant: "destructive",
          title: "Session Expired",
          description: "Your session has expired. Please login again.",
        });
      }
    }
  }, []);
  
  return (
    <div className="flex justify-center min-h-screen">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
