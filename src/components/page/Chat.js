import React from "react";
import { navigation } from "../../App";
import { formSubmit } from "../Utils";
import LoadingState from "../state/LoadingState";
import ErrorState from "../state/ErrorState";

export function Chat(props) {
  props.setCurrLang("chatGPT");
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

  return (
    <div className="query-container">
      {navigation()}
      <h2>Chat</h2>
      <form onSubmit={(e) => formSubmit(e, props)} className="query-form">
        <input
          type="text"
          className="query-input"
          placeholder="ask whatever you want to the all mighty GPT..."
          defaultValue={props.query}
          onChange={(e) => {
            props.setQuery(e.target.value);
          }}
        />
        <button className="query-button">Ask</button>
      </form>
      <div style={{ clear: "both" }}></div>
      <pre className="query-pre">{props.data}</pre>
    </div>
  );
}
