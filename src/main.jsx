import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import BlogList from "./components/Blog/BlogList";
import BlogPost from "./components/Blog/BlogPost";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
