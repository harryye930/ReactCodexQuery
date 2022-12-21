import "./App.css";
import React from "react";
import { Configuration, OpenAIApi } from "openai";
import { useState, useEffect, useRef } from "react";

const organization = "org-leTL3IF5fMRDqgQK4WlB92yj";
const apiKey = "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";
const configuration = new Configuration({
  organization: organization,
  apiKey: apiKey,
});


function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("print hello world in Python");

  const queryCodex = async (queryData) => {
    const codexParams = {
      model: "code-davinci-002",
      prompt: queryData,
      max_tokens: 100,
      temperature: 0.7,
      top_p: 1,
      n: 1,
      stream: false,
      logprobs: null,
    };

    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion(codexParams);
    console.log("Question: ", queryData);
    console.log("Codex answer: ", response)
    return response;
  };

  const queryProcess = (query) =>{
    setLoading(true);
    queryCodex(query)
        .then((response) => {
          setData(response.data.choices[0].text);
          setError(response.status !== 200);
        })
        .then(() => setLoading(false))
        .catch(setError);
  }

  // initial search page
  useEffect(() =>{
    queryProcess("print hello world in Python");
  }, [])

  const formSubmit = (e) => {
    e.preventDefault();
    queryProcess(query);
  };


  if (loading) return <h2>Loading...</h2>;
  if (error) {
    return <pre>{JSON.stringify(error)}</pre>;
  }
  if (!data) return null;

  return (

    <div>
      <form onSubmit={formSubmit}>  {/*execute formSubmit function when form is submitted*/}
        <input
          onChange={(e) => {
            setQuery(e.target.value);  // update query value whenever it's changed

          }
        }
          type="text"
          placeholder="ask whatever you want to Codex..."
        />
        <button>Ask</button>
      </form>
      <div className="display-linebreak">
        {data}
      </div>
    </div>
  );
}

export default App;
