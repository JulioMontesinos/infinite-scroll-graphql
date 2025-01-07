import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header Component", () => {
  
  // Test to verify if the provisional logo is rendered as a button
  it("renders the provisional logo as a button", () => {
    render(<Header query="" onSearch={() => {}} />);
    const logoButton = screen.getByRole("button", { name: /LOGO/i }); // Look for a button with the text "LOGO"
    expect(logoButton).toBeInTheDocument(); // Confirm the button is present in the DOM
  });

  // Test to verify if the SearchBar component is rendered with the correct props
  it("renders the SearchBar component", () => {
    render(<Header query="test" onSearch={() => {}} />);
    const input = screen.getByPlaceholderText("🔍︎ You're looking for something?");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("test"); 
  });
});