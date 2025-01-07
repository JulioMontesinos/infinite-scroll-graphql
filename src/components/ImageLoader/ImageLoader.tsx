import React, { useState, useEffect, useRef } from "react";
import { useLazyQuery } from "@apollo/client";

import ImageGrid from "../ImageGrid/ImageGrid";
import { GET_IMAGES } from "../../utils/queries";
import { Image } from "../../utils/types";

/*
* ImageLoader Component 
*
* Component to load and display images based on a search query.
* Uses Apollo Client's lazy query to fetch images from a GraphQL API and implements infinite scrolling
* with Intersection Observer. Handles loading, resetting, and deduplication of images.
*/

const ImageLoader: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
    const [images, setImages] = useState<Image[]>([]);
    const [cursor, setCursor] = useState<string | null>(null);
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  
    const [fetchImages, { loading, error, data }] = useLazyQuery(GET_IMAGES, {
      fetchPolicy: "network-only",
    });

    const observer = useRef<IntersectionObserver | null>(null);
    const lastImageRef = useRef<HTMLDivElement | null>(null);
  
    const loadImages = (reset: boolean = false) => {
  
      if (reset) {
        setCursor(null);
        setImages([]); // Reset images if it's a fresh load
        setHasNextPage(true);
      }
  
      fetchImages({
        variables: {
          first: 10,
          after: reset ? null : cursor,
          title: searchQuery || null,
        },
      });
    };
  
    useEffect(() => {
      if (data && data.images) {
        const newImages: Image[] = data.images.edges.map((edge: { node: Image }) => edge.node);
        setImages((prev) =>
          cursor
            ? [
                ...prev,
                ...newImages.filter((img: Image) => !prev.some((p: Image) => p.id === img.id)),
              ]
            : newImages
        );
        setCursor(data.images.pageInfo.endCursor);
        setHasNextPage(data.images.pageInfo.hasNextPage);
      }
    }, [data]);
  
    useEffect(() => {
      loadImages(true);
    }, [searchQuery]);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();
    
        observer.current = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && hasNextPage && !loading) {
              loadImages();
            }
          },
          { root: null, rootMargin: "300px" }
        );
    
        if (lastImageRef.current) observer.current.observe(lastImageRef.current);
    
        return () => {
          if (observer.current) observer.current.disconnect();
        };
      }, [lastImageRef.current, hasNextPage, loading]);
  
    if (error) return <div className="centered-message">Error loading images</div>;
    if (loading && !images.length) return <div className="centered-message">Loading...</div>;
    
  
    if (!images.length) {
      return (
        <div className="centered-message">
          There are no images matching these filters
        </div>
      );
    }

    // Finally, if there are images, display them
    return <ImageGrid images={images} />;
    };

export default ImageLoader;
  