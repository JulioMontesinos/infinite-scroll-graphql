import React, { useState, useEffect } from "react";
import "../../styles/imageCard.css";

/* 
* LikeButton Component
*
* LikeButton component to manage and display a like state for an item.
* Tracks whether the item is liked, the count of likes, and triggers a callback
* when the like state changes. Automatically updates when initial values change.
*/

interface LikeButtonProps {
  initialLiked: boolean;
  likes: number;
  onLikeToggle: (liked: boolean, likesCount: number) => void; // Callback when like state toggles
  "data-testid"?: string; //For testing purposes
}

const LikeButton: React.FC<LikeButtonProps> = ({ initialLiked, likes, onLikeToggle, "data-testid": dataTestId }) => {
  const [liked, setLiked] = useState<boolean>(initialLiked); 
  const [likesCount, setLikesCount] = useState<number>(likes);

  // Update the state if the initial props change
  useEffect(() => {
    setLiked(initialLiked);
    setLikesCount(likes);
  }, [initialLiked, likes]);

  const toggleLike = () => {
    const newLikedState = !liked;
    const newLikesCount = newLikedState ? likesCount + 1 : likesCount - 1;

    setLiked(newLikedState);
    setLikesCount(newLikesCount);

    if (onLikeToggle) {
      onLikeToggle(newLikedState, newLikesCount); // Trigger the callback with updated values
    }
  };

  return (
    <div className="action-button" onClick={toggleLike} data-testid={dataTestId}>
      <img
        src={liked ? "/like_red.svg" : "/like_black.svg"}
        alt={liked ? "Unlike" : "Like"}
      />
      <span className="action-count">{likesCount}</span>
    </div>
  );
};

export default LikeButton;