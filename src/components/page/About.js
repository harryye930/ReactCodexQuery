import { navigation } from "../../App";
import React from "react";

export function About() {
  return (
    <div className="query-container">
      {navigation()}
      <h2>About</h2>
      <p>
        This is a simple application that takes user input and query through
        OpenAI's GPT4 -- a Large Language Model. <br />
        To learn more about OpenAI and their amazing work, please visit their{" "}
        <a href="https://openai.com/" target="_blank" rel="noopener noreferrer">
          website
        </a>
        .
        <br />
        <br />
        To learn more about Harry and his experiences, please visit his{" "}
        <a href="https://harryye.com" target="_blank" rel="noopener noreferrer">
          personal website
        </a>
        .
        <br />
        <br />
        &copy; Copyright {new Date().getFullYear()}, Harry Ye
      </p>
    </div>
  );
}
