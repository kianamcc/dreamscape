import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import About from "../about";

test("Renders section title correctly", () => {
  const { getByText } = render(<About />);
  expect(getByText("What is Dreamscape?")).toBeInTheDocument();
});

test("Renders correct section description", () => {
  const { getByText } = render(<About />);
  expect(getByText(/Dreamscape is a gateway/i)).toBeInTheDocument();
});

test("About component follows correct HTML structure", () => {
  const { container } = render(<About />);
  expect(container.querySelector("section#about")).toBeInTheDocument();
});
