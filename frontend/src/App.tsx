import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/router/AppRouter";
import Navbar from "./components/ui/Navbar/Navbar";
import "@fontsource/mulish";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
