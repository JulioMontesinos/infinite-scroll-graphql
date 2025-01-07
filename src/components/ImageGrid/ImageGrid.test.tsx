import React from "react";
import { render, screen } from "@testing-library/react";
import ImageGrid from "./ImageGrid";
import { Image } from "../../utils/types";

describe("ImageGrid (no scroll)", () => {
  // Helper function to create mock images
  function createMockImages(count: number): Image[] {
    return Array.from({ length: count }, (_, i) => ({
      id: `id-${i}`,
      title: `Mock Image ${i}`,
      author: `Author ${i}`,
      price: i,
      likesCount: 100 + i,
      liked: false,
      picture: "https://via.placeholder.com/150",
    }));
  }

  it("displays 10 images if more than 10 are provided via props", () => {
    // Create 15 test images
    const mockImages = createMockImages(15);

    render(<ImageGrid images={mockImages} />);

    // Verify that only the first 10 images are displayed
    // (searching by altText 'Mock Image ...')
    expect(screen.getAllByAltText(/^Mock Image/)).toHaveLength(10);
  });

  it("displays all images if there are fewer than 10", () => {
    // Create 5 test images
    const mockImages = createMockImages(5);

    render(<ImageGrid images={mockImages} />);

    // If there are only 5 images, all 5 should be displayed
    expect(screen.getAllByAltText(/^Mock Image/)).toHaveLength(5);
  });

  it("updates the number of displayed images when props change", () => {
    // 1. Render with 0 images
    const { rerender } = render(<ImageGrid images={[]} />);
    expect(screen.queryAllByAltText(/^Mock Image/)).toHaveLength(0);

    // 2. Rerender with 12 images
    const mockImages = createMockImages(12);
    rerender(<ImageGrid images={mockImages} />);

    // Since there are 12 images, only 10 should be displayed
    expect(screen.getAllByAltText(/^Mock Image/)).toHaveLength(10);
  });
});