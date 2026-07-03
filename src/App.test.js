import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders dictionary heading", () => {
  render(<App />);
  let headingElement = screen.getByRole("heading", {
    name: /what word do you want to look up/i,
  });
  expect(headingElement).toBeInTheDocument();
});
