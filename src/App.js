import "./App.css";
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { History } from "./components/page/History";
import { About } from "./components/page/About";
import { PageNotFound } from "./components/page/PageNotFound";
import { Completion } from "./components/page/Completion";
import { Chat } from "./components/page/Chat";

export function navigation() {
  return (
    <nav className="nav">
      <Link to="/">Code Completion</Link>
      <Link to="/chat">Chat</Link>
      <Link to="/history">History</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}

export function App() {
  const [data, setData] = useState("");
  const [completionData, setCompletionData] = useState("");
  const [chatData, setChatData] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [completionQuery, setCompletionQuery] = useState("");
  const [chatQuery, setChatQuery] = useState("");
  const [currLang, setCurrLang] = useState("Choose a language");
  const [histories, setHistories] = useState([]);
  let mainProps = {
    data: data,
    setData: setData,
    error: error,
    setError: setError,
    loading: loading,
    setLoading: setLoading,
    currLang: currLang,
    setCurrLang: setCurrLang,
    histories: histories,
    setHistories: setHistories,
  };

  let completionProps = {
    ...mainProps,
    data: completionData,
    setData: setCompletionData,
    query: completionQuery,
    setQuery: setCompletionQuery,
  };

  let chatProps = {
    ...mainProps,
    data: chatData,
    setData: setChatData,
    query: chatQuery,
    setQuery: setChatQuery,
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Completion {...completionProps} />} />
        <Route path="/chat" element={<Chat {...chatProps} />} />
        <Route path="/history" element={<History {...mainProps} />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
