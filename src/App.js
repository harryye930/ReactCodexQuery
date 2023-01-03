import "./App.css";
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { MainApp, History, About, PageNotFound } from "./Components";

export function navigation() {
  return (
    <nav className="nav">
      <Link to="/">Query</Link>
      <Link to="/history">History</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}

export function App() {
  const [data, setData] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [currLang, setCurrLang] = useState("Choose a language");
  const [histories, setHistories] = useState([]);
  let mainProps = {
    data: data,
    setData: setData,
    error: error,
    setError: setError,
    loading: loading,
    setLoading: setLoading,
    query: query,
    setQuery: setQuery,
    currLang: currLang,
    setCurrLang: setCurrLang,
    histories: histories,
    setHistories: setHistories,
  };

  return (
    <Routes>
      <Route path="/" element={<MainApp {...mainProps} />} />
      <Route path="/history" element={<History {...mainProps} />} />}
      <Route path="/about" element={<About />} />}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
