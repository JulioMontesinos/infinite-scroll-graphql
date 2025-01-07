import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImageCard from "./ImageCard";

describe("ImageCard Component", () => {
  const mockProps = {
    id: "1",
    title: "Sample Image",
    author: "John Doe",
    price: 19.99,
    likesCount: 100, // Initial likes count
    liked: false,
    picture: "https://via.placeholder.com/150",
  };

  // Test to verify correct rendering of data
  it("renders the component with correct data", () => {
    render(<ImageCard {...mockProps} />);

    // Check that title and author are displayed
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(
      screen.getByText((content, element) =>
        element?.textContent === `by ${mockProps.author}`
      )
    ).toBeInTheDocument();

    // Check that the price is displayed
    expect(screen.getByText(`${mockProps.price.toFixed(2)} €`)).toBeInTheDocument();

    // Check that the likes counter starts at 100
    expect(screen.getByTestId("likes-count")).toHaveTextContent("100");
  });

  it("handles like button click and updates state dynamically", async () => {
    // Mock fetch to simulate a successful like API response
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        data: {
          likeImage: {
            image: {
              liked: true,
              likesCount: mockProps.likesCount + 1, // 100 + 1 => 101
            },
          },
        },
      }),
    } as Response);

    // Render with initial props
    render(<ImageCard {...mockProps} />);

    // Simulate a click on the like button
    await userEvent.click(screen.getByTestId("like-button"));

    // Verify that the likes count updates to 101
    expect(await screen.findByTestId("likes-count")).toHaveTextContent(
      String(mockProps.likesCount + 1)
    );
  });

  // Test to verify the presence of the mobile LikeButton
  it("renders LikeButton for mobile actions", () => {
    render(<ImageCard {...mockProps} />);

    // Check that the mobile like button is present
    expect(screen.getByTestId("like-button-mobile")).toBeInTheDocument();
  });
});