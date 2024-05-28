import { PokemonProvider } from "./contexts/pokemon/pokemon.provider";

import "./app.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ListPage from "@pages/list";
import DetailsPage from "@pages/details";

import { LIST_PAGE, DETAILS_PAGE } from "@constants/routing.constants";

const router = createBrowserRouter([
  {
    ...LIST_PAGE,
    element: <ListPage />,
  },
  {
    ...DETAILS_PAGE,
    element: <DetailsPage />,
  },
]);

function App() {
  return (
    <PokemonProvider>
      <RouterProvider router={router} />
    </PokemonProvider>
  );
}

export default App;
