import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Rating = ({ rating, style, onRatingStarClick }) => {
  return (
    <>
      {[...Array(5)].map((_, i) => {
        return (
          <span
            key={i}
            onClick={() =>
              onRatingStarClick({ type: "FILTER_BY_RATING", payload: i + 1 })
            }
            style={style}
          >
            {rating > i ? (
              <AiFillStar fontSize="15px" />
            ) : (
              <AiOutlineStar fontSize="15px" />
            )}
          </span>
        );
      })}
    </>
  );
};

export default Rating;
