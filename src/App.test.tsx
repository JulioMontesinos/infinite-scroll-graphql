import React from "react";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import App from "./App";
import { GET_IMAGES } from "./utils/queries";

// Set up mock GraphQL data for the tests
const mocks = [
  {
    request: {
      query: GET_IMAGES, // GraphQL query being tested
      variables: { first: 10, after: null, title: null }, // Default variables for the query
    },
    result: {
      data: {
        images: {
          edges: [
            {
              cursor: "cursor1", // Cursor for pagination
              node: { // Mocked image data
                id: "1",
                title: "Sample Image",
                author: "John Doe",
                price: 100,
                likesCount: 10,
                liked: false,
                picture: "https://via.placeholder.com/150",
              },
            },
          ],
          pageInfo: {
            endCursor: "cursor1", // End cursor for the current page
            hasNextPage: true, // Indicates more data is available
          },
        },
      },
    },
  },
];

// Test of App Component
test("renders App component without crashing", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );

  // Verify if the header with the logo is displayed
  const headerElement = screen.getByText(/LOGO/i);
  expect(headerElement).toBeInTheDocument();

  // Verify if the mocked image title is displayed
  const imageTitle = await screen.findByText("Sample Image");
  expect(imageTitle).toBeInTheDocument();
});