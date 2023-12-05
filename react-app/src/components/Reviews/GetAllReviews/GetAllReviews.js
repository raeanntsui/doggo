import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneProductThunk } from "../../../store/products";
import { getAllReviewsThunk } from "../../../store/reviews";
// import NewReviewModal from "../Reviews/CreateReview";
// import PostReviewModalContent from "./ReviewForm";
// import OpenModalButton from "../OpenModalButton";
// import DeleteReview from "../DeleteReview/DeleteReview";

function GetAllReviews() {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const currentSessionUser = useSelector((state) => state.session.user);
  console.log("🚀🚀🚀🚀🚀🚀 ~ currentSessionUser:", currentSessionUser);

  const currentProduct = useSelector(
    (state) => state.products.allProducts[productId]
  );
  console.log("🚀🚀🚀🚀🚀🚀 ~ current product:", currentProduct);

  const allReviewsObject = useSelector((state) => state.reviews.allReviews);
  console.log("🚀🚀🚀🚀🚀🚀 ~ allReviewsObject:", allReviewsObject);

  const reviewArr = Object.values(allReviewsObject);
  console.log("🚀🚀🚀🚀🚀🚀 ~ reviewArr:", reviewArr);

  const reviewWriter = reviewArr[0].user.id;
  console.log("🚀🚀🚀🚀🚀🚀 ~ reviewWriter:", reviewWriter);
  useEffect(() => {
    dispatch(getOneProductThunk(productId));
    dispatch(getAllReviewsThunk(productId));
  }, [dispatch, productId, reviewArr.length]);

  if (
    !currentProduct ||
    Object.keys(currentProduct).length === 0 ||
    !allReviewsObject ||
    !reviewArr
  ) {
    return null;
  }

  let counter = 1;
  let existingReview;

  // check if the current session user wrote a review or not
  // check if review id === currentSessionUser.id

  return (
    <>
      {reviewArr.reverse().map((oneReview) => (
        <div key={oneReview.id}>
          <h2>Review ID:{oneReview.id}</h2>
          <h2>Stars: {oneReview.rating}</h2>
          <h2>{oneReview.review_description}</h2>
          {oneReview.review_image ? (
            <img src={oneReview.review_image} />
          ) : (
            <h2>No review image to show</h2>
          )}
        </div>
      ))}
    </>
  );
}

export default GetAllReviews;
