import { render, screen } from "@testing-library/react";
import { App } from "./App";

test("renders learn react link", () => {
  render(<App />);
  const header = document.querySelector("h1");
  expect(header).toBeInTheDocument();
});
