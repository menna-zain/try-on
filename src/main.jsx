import "@fortawesome/fontawesome-free/css/all.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@fontsource/montserrat';
import '@fontsource/inter';
import '@fontsource/poppins'; 


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
