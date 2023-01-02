import "./App.css";
import React, { useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import { Link } from "react-router-dom";

const organization = "YOUR ORG KEY";
const apiKey = "YOUR API KEY";
const configuration = new Configuration({
  organization: organization,
  apiKey: apiKey,
});

function navigation() {
  return (
    <nav className="nav">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/history">History</Link>
    </nav>
  );
}

export function App() {
  const [data, setData] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [currLang, setCurrLang] = useState("Choose a language");

  const supportedLang = [
    { label: "Python", value: "Python" },
    { label: "Java", value: "Java" },
    { label: "C", value: "C" },
    { label: "Other", value: "Other" },
  ];

  // TODO: we could expend this function to support popular languages, add contexts, etc...
  const formatQuery = (query) => {
    let formattedQuery;
    if (currLang === "Python") {
      formattedQuery = query + " in Python";
    } else if (currLang === "Java") {
      formattedQuery = query + " in Java";
    } else if (currLang === "C") {
      formattedQuery = query + " in C";
    } else {
      formattedQuery = query;
    }
    return formattedQuery;
  };

  const queryCodex = async (query) => {
    const formattedQuery = formatQuery(query);
    const codexParams = {
      model: "code-davinci-002",
      prompt: formattedQuery,
      max_tokens: 100,
      temperature: 0.7,
      top_p: 1,
      n: 1,
      stream: false,
      logprobs: null,
    };
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion(codexParams);
    console.log("Question: ", formattedQuery);
    console.log("Codex answer: ", response);
    return response;
  };

  const processQuery = (query) => {
    setLoading(true);
    queryCodex(query)
      .then((response) => {
        setData(response.data.choices[0].text);
        setError(response.status !== 200);
      })
      .then(() => setLoading(false))
      .catch(setError);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    processQuery(query);
  };

  useEffect(() => {
    processQuery('print "hello world" in Python');
  }, []);

  if (error) {
    return (
      <div>
        <h1>ERROR!</h1>
        <pre>{JSON.stringify(error.message)}</pre>)
      </div>
    );
  }
  if (loading)
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );

  return (
    <div>
      {navigation()}
      <form onSubmit={formSubmit}>
        {/*execute setQuery function when form is submitted, and preserve query*/}
        <input
          type="text"
          placeholder="ask whatever you want to Codex..."
          defaultValue={query}
          onChange={(e) => {
            setQuery(e.target.value); // update query value whenever it's changed
          }}
        />
        {/*select preferred coding language, and preserve selection*/}
        <select
          defaultValue={currLang}
          onChange={(e) => {
            setCurrLang(e.target.value);
            console.log("Current language: ", e.target.value);
          }}
        >
          <option value="Choose a language" disabled>
            Choose a language
          </option>
          {supportedLang.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button>Ask</button>
      </form>
      <div style={{ clear: "both" }}></div>
      <pre>{data}</pre>
    </div>
  );
}

export function History() {
  return (
    <div>
      {navigation()}
      <h2>History</h2>
      <p>This is the your history of interactions with Codex</p>
    </div>
  );
}

export function About() {
  return (
    <div>
      {navigation()}
      <h2>About</h2>

      <p>
        This is a simple application that takes user input and query through
        OpenAI's Codex -- a large language model. <br />
        To learn more about OpenAI and Codex, please visit their{" "}
        <a href="https://openai.com/">website</a>.
        <br />
        <br />
        &copy; Copyright {new Date().getFullYear()}, Harry Ye
      </p>
    </div>
  );
}

export function PageNotFound() {
  return (
    <div className="pageNotFound">
      <h2>ERROR: 404 Page not found</h2>
      <img
        className="pageNotFoundImg"
        src="https://img.freepik.com/free-vector/error-404-concept-landing-page_52683-12188.jpg?w=1380&t=st=1672677752~exp=1672678352~hmac=505145aafa8f70dcd1749bcbab59454625e601da767c4f50412f7213579347da"
        alt="404 Error"
      />
    </div>
  );
}
