import "./App.css";
import React, { useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai";

const organization = "org-Wiy1JIqGFBpVLc3EHdCZ8rBK";
const apiKey = "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";
const configuration = new Configuration({
  organization: organization,
  apiKey: apiKey,
});

function App() {
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

  // we could expend this function to support popular languages...
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
    return <pre> ERROR! {JSON.stringify(error.message)}</pre>;
  }
  if (loading) return <h2>Loading...</h2>;

  return (
    <span>
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
    </span>
  );
}

export default App;
