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
  // console.log("🚀🚀🚀🚀🚀🚀 ~ currentSessionUser:", currentSessionUser);
  const products = useSelector((state) => state.products.allProducts);
  const allReviewsObject = useSelector((state) => state.reviews.allReviews);
  const reviewArr = Object.values(allReviewsObject);

  useEffect(() => {
    dispatch(getOneProductThunk(productId));
    dispatch(getAllReviewsThunk(productId));
  }, [dispatch, productId, reviewArr.length]);

  if (
    !products ||
    Object.keys(products).length === 0 ||
    !allReviewsObject ||
    !reviewArr
  ) {
    return null;
  }

  let counter = 1;
  let existingReview;

  if (currentSessionUser) {
    existingReview = reviewArr.find(
      (review) => review.User.id === currentSessionUser.id
    );
  }
  return (
    <>
      {reviewArr.reverse().map((singleReview) => (
        <div key={singleReview.id} id="single-review">
          {singleReview.User && singleReview.User.firstName}
          <h9>{singleReview.review}</h9>
          {currentSessionUser &&
          currentSessionUser.id === singleReview.User.id ? (
            <h1>Delete review button here</h1>
          ) : // <div id="delete-button">
          //   <OpenModalButton
          //     buttonText="Delete Review"
          //     modalComponent={
          //       <DeleteReview
          //         review={existingReview}
          //         product={productId}
          //       />
          //     }
          //   />
          // </div>
          null}
        </div>
      ))}
    </>
  );
}

export default GetAllReviews;
