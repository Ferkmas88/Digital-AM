import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import BlogList from "./components/Blog/BlogList";
import BlogPost from "./components/Blog/BlogPost";
import ResenasPage from "./pages/Resenas";
import CasosPage from "./pages/Casos";
import SobreMiPage from "./pages/SobreMi";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/resenas" element={<ResenasPage />} />
        <Route path="/reseñas" element={<ResenasPage />} />
        <Route path="/casos" element={<CasosPage />} />
        <Route path="/sobre-mi" element={<SobreMiPage />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
