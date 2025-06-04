import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import MovieDetails from "./pages/MovieDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/movie-details/:id",
    Component: MovieDetails,
  },
]);

const root = document.getElementById("root");

createRoot(root).render(<RouterProvider router={router} />);
