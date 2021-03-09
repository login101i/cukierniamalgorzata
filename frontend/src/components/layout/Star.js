import React from "react";
import StarRating from "react-star-ratings";

const Star = ({ starClick, numberOfStars, rating}) => (
    
    <>
        <StarRating
            changeRating={() => starClick(numberOfStars)}
            numberOfStars={numberOfStars}
            starDimension="20px"
            starSpacing="2px"
            starHoverColor="rgb(209, 222, 230)"
            starEmptyColor="grey"
            rating={rating}
            isSelectable
            isAggregateRating


        />
        <br />

    </>
);

export default Star;
