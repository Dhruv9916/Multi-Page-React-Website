import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Country } from "./pages/Country";
import { Home } from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "country",
    element: <Country />,
  },
  {
    path: "contact",
    element: <Contact />,
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>
};

export default App;
