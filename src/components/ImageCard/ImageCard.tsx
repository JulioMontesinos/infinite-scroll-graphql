import React, { useState } from "react";
import "../../styles/imageCard.css";
import LikeButton from "../LikeButton/LikeButton";

/**
 * ImageCard Component
 * 
 * Displays an image card with details such as title, author, and price.
 * Includes interactive functionality to like an image, with updates sent to a GraphQL API.
 * 
 * - Props include image metadata and the initial like state.
 * - Handles like interactions and updates the UI based on API responses.
 */

const API_URL = process.env.REACT_APP_GRAPHQL_API ?? "";

interface ImageCardProps {
  id: string; 
  title: string;
  author: string;
  price: number;
  likesCount: number; 
  liked: boolean; // Initial state of Like
  picture: string;
}

const ImageCard: React.FC<ImageCardProps> = ({
  id,
  title,
  author,
  price,
  likesCount,
  liked,
  picture,
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(liked); 
  const [currentLikes, setCurrentLikes] = useState<number>(likesCount);

  /**
   * Handles the like button click.
   * Sends a mutation to the GraphQL API to update the like status and retrieves the updated state.
   */
  const handleLikeClick = async () => {
    try {
      // Mutation of API
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation LikeImage($input: LikeImageInput!) {
              likeImage(input: $input) {
                image {
                  liked
                  likesCount
                }
              }
            }
          `,
          variables: {
            input: {
              imageId: id,
            },
          },
        }),
      });

      const result = await response.json();

      // Updates the local state based on the API response
      if (result?.data?.likeImage?.image) {
        setIsLiked(result.data.likeImage.image.liked);
        setCurrentLikes(result.data.likeImage.image.likesCount);
      } else {
        console.error("Error updating like:", result.errors || "Unknown error");
      }
    } catch (error) {
      console.error("Error while liking the image:", error);
    }
  };

  return (
    <div className="image-card">
      {price && <div className="price-tag"><span>{price.toFixed(2)} €</span></div>}
      <img src={picture} alt={title} className="image" />
      <div className="info">
        <h3 className="title">{title}</h3>
        <p className="author">
          by <span className="author-name">{author}</span>
        </p>

        {/* Actions for mobile */}
        <div className="actions-mobile">
          
          {/* Column 1: Likes */}
          <LikeButton
            initialLiked={liked}
            likes={likesCount}
            onLikeToggle={handleLikeClick} // Propaga los cambios al servidor
            data-testid="like-button-mobile"
          />
          <div className="action-button">
            <span className="action-count">0</span>
            <img src="/share_black.svg" alt="Share" />
          </div>  
        </div>
      
      </div>

      {/* Floating actions for larger screens */}
      <div className="actions">
        <div className="action-button" onClick={handleLikeClick} data-testid="like-button">
          <img src={isLiked ? "/like_red.svg" : "/like_white.svg"} alt="Like" />
          <span className="action-count" data-testid="likes-count">{currentLikes}</span>
        </div>
        <div className="action-button">
          <img src="/share_white.svg" alt="Share" />
          <span className="action-count">0</span>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;