import React from "react";
import { navigation } from "../../App";

export function History(props) {
  let histories = props.histories;
  console.log(histories);
  return (
    <div className="query-container">
      {navigation()}
      <h2>History</h2>
      <div>
        {Object.keys(histories).length > 0 ? (
          <ol>
            {Object.keys(histories).map((key, index) => (
              <li key={index} style={{ marginBottom: "20px" }}>
                {index !== 0 && <hr />}{" "}
                {/* Don't add line before the first question */}
                <p
                  style={{
                    fontWeight: "bold",
                    paddingBottom: "5px",
                  }}
                >
                  Question: {histories[key].question}
                </p>
                <p style={{ fontStyle: "italic", color: "#666" }}>
                  Model: {histories[key].model}
                </p>
                <pre className="query-pre">{histories[key].answer} </pre>
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
