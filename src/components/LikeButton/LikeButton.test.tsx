import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LikeButton from "./LikeButton";

describe("LikeButton component", () => {
  it("displays the initial number of likes and the 'Like' or 'Unlike' state", () => {
    const mockOnToggle = jest.fn();
    const { rerender } = render(
      <LikeButton
        initialLiked={false}
        likes={10}
        onLikeToggle={mockOnToggle}
        data-testid="like-button"
      />
    );

    // Check that the text '10' is in the document
    expect(screen.getByText("10")).toBeInTheDocument();
    // Check that the alt text is "Like" (because initialLiked = false)
    expect(screen.getByAltText("Like")).toBeInTheDocument();

    // Rerender with initialLiked set to true, to check a different case
    rerender(
      <LikeButton
        initialLiked={true}
        likes={50}
        onLikeToggle={mockOnToggle}
        data-testid="like-button"
      />
    );

    // Now it should display 50 and alt="Unlike"
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByAltText("Unlike")).toBeInTheDocument();
  });

  it("increments likes and calls onLikeToggle when clicked and not 'liked'", async () => {
    const mockOnToggle = jest.fn();
    render(
      <LikeButton
        initialLiked={false}
        likes={10}
        onLikeToggle={mockOnToggle}
        data-testid="like-button"
      />
    );

    // Simulate a click
    await userEvent.click(screen.getByTestId("like-button"));

    // Likes should increment from 10 to 11
    expect(screen.getByText("11")).toBeInTheDocument();
    // Alt text should now be "Unlike"
    expect(screen.getByAltText("Unlike")).toBeInTheDocument();
    // Callback should be called with (liked=true, likesCount=11)
    expect(mockOnToggle).toHaveBeenCalledWith(true, 11);
  });

  it("decrements likes and calls onLikeToggle when clicked and already 'liked'", async () => {
    const mockOnToggle = jest.fn();
    render(
      <LikeButton
        initialLiked={true}
        likes={20}
        onLikeToggle={mockOnToggle}
        data-testid="like-button"
      />
    );

    // Simulate a click
    await userEvent.click(screen.getByTestId("like-button"));

    // Likes should decrement from 20 to 19
    expect(screen.getByText("19")).toBeInTheDocument();
    // Alt text should now be "Like"
    expect(screen.getByAltText("Like")).toBeInTheDocument();
    // Callback should be called with (liked=false, likesCount=19)
    expect(mockOnToggle).toHaveBeenCalledWith(false, 19);
  });

  it("allows toggling multiple times", async () => {
    const mockOnToggle = jest.fn();
    render(
      <LikeButton
        initialLiked={false}
        likes={5}
        onLikeToggle={mockOnToggle}
        data-testid="like-button"
      />
    );

    // 1st click: from 5 to 6
    await userEvent.click(screen.getByTestId("like-button"));
    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.getByAltText("Unlike")).toBeInTheDocument();
    expect(mockOnToggle).toHaveBeenLastCalledWith(true, 6);

    // 2nd click: from 6 to 5
    await userEvent.click(screen.getByTestId("like-button"));
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByAltText("Like")).toBeInTheDocument();
    expect(mockOnToggle).toHaveBeenLastCalledWith(false, 5);
  });
});