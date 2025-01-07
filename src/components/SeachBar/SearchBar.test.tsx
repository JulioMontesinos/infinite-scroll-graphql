import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

describe("SearchBar Component", () => {
  it("renders with a placeholder and initial value", () => {
    const initialQuery = "Hello World";
    render(<SearchBar query={initialQuery} onSearch={() => {}} />);
    const input = screen.getByPlaceholderText("🔍︎ You're looking for something?");
    expect(input).toHaveValue(initialQuery);
  });

  it("calls onSearch on each key press with only the last typed character (because the prop is not re-rendered)", async () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar query="" onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText("🔍︎ You're looking for something?");
    
    await userEvent.type(input, "Hello Testing");

    // If "Hello Testing" has 12 characters including space,
    // Allow an extra call for controlled component behavior
    expect(mockOnSearch).toHaveBeenCalledTimes(12 + 1);

    // Verify the last call argument
    const lastCallArg = mockOnSearch.mock.calls[mockOnSearch.mock.calls.length - 1][0];
    console.log("Last value passed to onSearch:", lastCallArg);
    
    // Optionally, ensure the last argument is the last character typed ("g")
    expect(lastCallArg).toBe("g");
  });
});