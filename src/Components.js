import React, { useEffect } from "react";
import { navigation } from "./App";
import { Configuration, OpenAIApi } from "openai";

const organization = "your_org_key";
const apiKey = "your_api_key";
const configuration = new Configuration({
  organization: organization,
  apiKey: apiKey,
});

const supportedLang = [
  { label: "Python", value: "Python" },
  { label: "Java", value: "Java" },
  { label: "C", value: "C" },
  { label: "Other", value: "Other" },
];

// TODO: we could expend this function to support popular languages, add contexts, etc...
const formatQuery = (props) => {
  let formattedQuery;
  if (props.currLang === "Python") {
    formattedQuery = props.query + " in Python";
  } else if (props.currLang === "Java") {
    formattedQuery = props.query + " in Java";
  } else if (props.currLang === "C") {
    formattedQuery = props.query + " in C";
  } else {
    formattedQuery = props.query;
  }
  return formattedQuery;
};

const addToHistory = (props) => {
  let newEntry = { question: formatQuery(props), answer: props.data };
  console.log("existing history:", props.histories);
  let histories = props.histories;
  if (newEntry.question.toString() !== "") {
    if (histories.length === 0) {
      console.log("adding new entry: ", newEntry);
      histories.push(newEntry);
      console.log("new history: ", histories);
    } else if (
      JSON.stringify(histories[histories.length - 1]) !==
      JSON.stringify(newEntry)
    ) {
      console.log("adding new entry: ", newEntry);
      histories.push(newEntry);
      console.log("new history: ", histories);
    }
  }
};

const queryCodex = async (props) => {
  const formattedQuery = formatQuery(props);
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

const processQuery = (props) => {
  props.setLoading(true);
  queryCodex(props)
    .then((response) => {
      props.setData(response.data.choices[0].text);
      props.setError(response.status !== 200);
    })
    .then(() => props.setLoading(false))
    .catch(props.setError);
};

const formSubmit = (e, props) => {
  e.preventDefault();
  processQuery(props);
};

// Query Component
export function MainApp(props) {
  useEffect(() => {
    addToHistory(props);
  }, [props.data]);

  if (props.error) {
    return (
      <div>
        <h1>ERROR!</h1>
        <pre>{JSON.stringify(props.error.message)}</pre>)
      </div>
    );
  }
  if (props.loading)
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );

  return (
    <div>
      {navigation()}
      <h2>Query</h2>
      <form
        onSubmit={(e) => {
          formSubmit(e, props);
        }}
      >
        {/*execute setQuery function when form is submitted, and preserve query*/}
        <input
          type="text"
          placeholder="ask whatever you want to Codex..."
          defaultValue={props.query}
          onChange={(e) => {
            props.setQuery(e.target.value); // update query value whenever it's changed
          }}
        />
        {/*select preferred coding language, and preserve selection*/}
        <select
          defaultValue={props.currLang}
          onChange={(e) => {
            props.setCurrLang(e.target.value);
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
      <pre>{props.data}</pre>
    </div>
  );
}

// History Component
export function History(props) {
  let histories = props.histories;
  return (
    <div>
      {navigation()}
      <h2>History</h2>
      <div>
        {Object.keys(histories).length > 0 ? (
          <ol>
            {Object.keys(histories).map((key, index) => (
              <li key={index}>
                <p>Question: {histories[key].question}</p>
                <p>Answer: {histories[key].answer}</p>
              </li>
            ))}
          </ol>
        ) : (
          <p>No history was found ...</p>
        )}
      </div>
    </div>
  );
}

// About Component
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

// 404 Component
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
