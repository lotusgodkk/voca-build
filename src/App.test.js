// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  queryByTestId,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Word Search Feature", () => {
  test("Search input field is present", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("search-input")).toBeInTheDocument();
  });

  test("Search button should not work if input is empty", async () => {
    const { getByTestId, queryByTestId } = render(<App />);
    const searchInput = getByTestId("search-input");
    fireEvent.change(searchInput, {
      target: { value: "" },
    });
    fireEvent.click(getByTestId("search-button"));
    expect(queryByTestId("search-results")).toBeNull();
  });

  //   test("Search triggers API call", async () => {
  //     const { getByTestId, queryByTestId } = render(<App />);
  //     const searchInput = getByTestId("search-input");
  //     const searchButton = getByTestId("search-button");
  //     userEvent.type(searchInput, "test");
  //     expect(searchInput.value).toBe("test");
  //     fireEvent.change(searchInput);
  //     fireEvent.click(searchButton);
  //     const searchResults = await waitFor(() => queryByTestId("results-modal"));
  //     console.log(searchResults);
  //     expect(searchResults.children).toHaveLength(1);
  //     expect(asFragment()).toMatchSnapshot();
  //   });
});

describe("Word Details Modal-Dialog Feature", () => {
  test("Modal is hidden by default", () => {
    const { queryByTestId } = render(<App />);
    expect(queryByTestId("search-results")).not.toBeInTheDocument();
  });
});

describe("Guessing Game Feature", () => {
  test("Guess button triggers the game modal", async () => {
    const { getByText, getByTestId } = render(<App />);
    fireEvent.click(getByTestId("guess-button"));
    await waitFor(() => expect(getByText("Guess Game")).toBeInTheDocument());
    const placeholder = getByTestId("no-results");
    expect(placeholder).toBeInTheDocument();
  });
  /*
  test("Guess Game modal should show placeholder due to lack of data", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<App />);
    fireEvent.click(getByTestId("guess-button"));
    const inputField = getByTestId("guess-input");
    const randomWord = "TestWord";
    const synonym = "Synonym";
    fireEvent.change(inputField, { target: { value: synonym } });
    fireEvent.click(getByText("Submit"));
    await waitFor(() => expect(getByText("Score: 1")).toBeInTheDocument());
  });
/*
  test("Entering invalid synonym resets score", async () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    fireEvent.click(getByText("Guess"));
    const inputField = getByPlaceholderText("Enter a synonym");
    const randomWord = "TestWord";
    const invalidSynonym = "InvalidSynonym";
    fireEvent.change(inputField, { target: { value: invalidSynonym } });
    fireEvent.click(getByText("Submit"));
    await waitFor(() => expect(getByText("Score: 0")).toBeInTheDocument());
  });
  */
});
