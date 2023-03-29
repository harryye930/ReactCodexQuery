import React from "react";
import { navigation } from "../../App";
import { formSubmit } from "../Utils";
import ErrorState from "../state/ErrorState";
import LoadingState from "../state/LoadingState";

const supportedLang = [
  { label: "Python", value: "Python" },
  { label: "Java", value: "Java" },
  { label: "C", value: "C" },
  { label: "Other", value: "Other" },
];

export function Completion(props) {
  if (props.error) {
    return (
      <ErrorState
        error={props.error}
        refreshPage={() => window.location.reload()}
      />
    );
  }
  if (props.loading) {
    return <LoadingState />;
  }
  if (props.error) {
    return (
      <ErrorState
        error={props.error}
        refreshPage={() => window.location.reload(false)}
      />
    );
  }
  if (props.loading) {
    return <LoadingState />;
  }

  return (
    <div className="query-container">
      {navigation()}
      <h2>Completion</h2>
      <form onSubmit={(e) => formSubmit(e, props)} className="query-form">
        <input
          type="text"
          placeholder="ask whatever you want to the all mighty GPT..."
          defaultValue={props.query}
          onChange={(e) => {
            props.setQuery(e.target.value);
          }}
          className="query-input"
        />
        <select
          defaultValue={props.currLang}
          onChange={(e) => {
            props.setCurrLang(e.target.value);
          }}
          className="query-select"
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
        <button className="query-button">Ask</button>
      </form>
      <div style={{ clear: "both" }}></div>
      <pre className="query-pre">{props.data}</pre>
    </div>
  );
}
