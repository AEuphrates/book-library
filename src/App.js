import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CategoryList from "./components/CategoryList";
import BookList from "./components/BookList";
import PublisherList from "./components/PublisherList";
import AuthorList from "./components/AuthorList";
import PurchaseList from "./components/PurchaseList";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/publishers" element={<PublisherList />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/authors" element={<AuthorList />} />
        <Route path="/purchases" element={<PurchaseList />} />
      </Routes>
    </Router>
  );
}

export default App;
