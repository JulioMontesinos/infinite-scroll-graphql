import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import ImageLoader from "./ImageLoader";
import { GET_IMAGES } from "../../utils/queries";
import { Image } from "../../utils/types";

// 1. Define some example mocks
const mockImagesData: Image[] = [
  {
    id: "1",
    title: "Mocked Image 1",
    author: "Author 1",
    price: 10,
    likesCount: 100,
    liked: false,
    picture: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    title: "Mocked Image 2",
    author: "Author 2",
    price: 20,
    likesCount: 200,
    liked: false,
    picture: "https://via.placeholder.com/150",
  },
];

// 2. Define mocks for different situations
// A) Mock for a successful query result with data
const successMock = {
  request: {
    query: GET_IMAGES,
    variables: {
      first: 10,
      after: null,
      title: null,
    },
  },
  result: {
    data: {
      images: {
        edges: mockImagesData.map((img) => ({
          cursor: "cursor_" + img.id,
          node: img,
        })),
        pageInfo: {
          endCursor: "cursor_2",
          hasNextPage: true,
        },
      },
    },
  },
};

// B) Mock for an empty query result (no images)
const emptyMock = {
  request: {
    query: GET_IMAGES,
    variables: {
      first: 10,
      after: null,
      title: null,
    },
  },
  result: {
    data: {
      images: {
        edges: [],
        pageInfo: {
          endCursor: null,
          hasNextPage: false,
        },
      },
    },
  },
};

// C) Mock for a query error
const errorMock = {
  request: {
    query: GET_IMAGES,
    variables: {
      first: 10,
      after: null,
      title: null,
    },
  },
  error: new Error("Test error"),
};

describe("ImageLoader Component", () => {
  it("shows the loading screen initially", () => {
    // Render with the success mock but without waiting for the response
    render(
      <MockedProvider mocks={[successMock]} addTypename={false}>
        <ImageLoader searchQuery="" />
      </MockedProvider>
    );

    // Should display the "Loading..." message while waiting for data
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays an error message when the query fails", async () => {
    // Render with the error mock
    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <ImageLoader searchQuery="" />
      </MockedProvider>
    );

    // Wait for the error message to appear
    await waitFor(() =>
      expect(screen.getByText("Error loading images")).toBeInTheDocument()
    );
  });

  it("shows 'no images' when the query returns an empty array", async () => {
    // Render with the empty result mock
    render(
      <MockedProvider mocks={[emptyMock]} addTypename={false}>
        <ImageLoader searchQuery="" />
      </MockedProvider>
    );

    // Initially shows "Loading..."
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for the 'no images' message to appear
    await waitFor(() =>
      expect(
        screen.getByText("There are no images matching these filters")
      ).toBeInTheDocument()
    );
  });

  it("displays images when the query returns data", async () => {
    // Render with the success mock that returns two images
    render(
      <MockedProvider mocks={[successMock]} addTypename={false}>
        <ImageLoader searchQuery="" />
      </MockedProvider>
    );

    // Should display "Loading..." initially
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Then, wait for the images to appear
    for (const img of mockImagesData) {
      // Use findByAltText asynchronously or waitFor with getByAltText
      expect(await screen.findByAltText(img.title)).toBeInTheDocument();
    }
  });
});