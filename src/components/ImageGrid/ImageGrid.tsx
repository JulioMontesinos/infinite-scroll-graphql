import React, { useEffect, useState } from "react";
import ImageCard from "../ImageCard/ImageCard";
import "../../styles/imageGrid.css";
import { Image } from "../../utils/types";

interface ImageGridProps {
  images: Image[];
}

/**
 * ImageGrid Component
 * 
 * Displays a grid of images and implements infinite scroll to load more images as the user scrolls down.
 */
const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  const [displayedImages, setDisplayedImages] = useState<Image[]>([]);
  const [cursor, setCursor] = useState<number>(0);
  const imagesPerPage = 10;

  // Function to load more images based on the cursor
  const loadMoreImages = () => {
    const nextImages = images.slice(cursor, cursor + imagesPerPage);
    setDisplayedImages((prev) => [...prev, ...nextImages]);
    setCursor((prev) => prev + imagesPerPage);
  };

  // Handle scroll to load more images when reaching the bottom of the page
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.offsetHeight &&
      cursor < images.length // Check if there are more images to load
    ) {
      loadMoreImages();
    }
  };

  useEffect(() => {
    // Load initial images
    setDisplayedImages(images.slice(0, imagesPerPage));
    setCursor(imagesPerPage);

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [images]); // Runs only when the `images` prop changes

  return (
    <div className="image-grid">
      {displayedImages.map((image, index) => (
        <ImageCard
          key={`${image.id}-${index}`}
          id={image.id}
          title={image.title}
          author={image.author}
          price={image.price}
          likesCount={image.likesCount}
          liked={image.liked}
          picture={image.picture}
        />
      ))}
    </div>
  );
};

export default ImageGrid;