import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneProductThunk } from "../../../store/products";
import { getAllReviewsThunk } from "../../../store/reviews";
import { useModal } from "../../../context/Modal";
import UpdateReviewForm from "../UpdateReview/UpdateReview";
import "./GetAllReviews.css";
function GetAllReviews() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const currentSessionUser = useSelector((state) => state.session.user);
  const currentProduct = useSelector(
    (state) => state.products.allProducts[productId]
  );
  const allReviewsObject = useSelector((state) => state.reviews.allReviews);
  const reviewArr = Object.values(allReviewsObject);

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

  let userReview;
  if (currentSessionUser) {
    userReview = Object.values(allReviewsObject).filter(
      (review) => review.user_id === currentSessionUser.id
    );
  }

  const renderStars = (rating) => {
    const starElements = [];
    const filledStars = Math.floor(rating);

    for (let i = 0; i < filledStars; i++) {
      starElements.push(
        <i key={i} className="fa-solid fa-star filled-stars"></i>
      );
    }

    const emptyStars = 5 - filledStars;
    for (let i = 0; i < emptyStars; i++) {
      starElements.push(
        <i key={`empty-${i}`} className="fa-regular fa-star filled-stars"></i>
      );
    }

    return starElements;
  };

  const calculateAverageRating = () => {
    if (reviewArr.length === 0) {
      return 0;
    }

    const totalRating = reviewArr.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return totalRating / reviewArr.length;
  };

  const averageRating = calculateAverageRating();

  return (
    <>
      <div id="review-count">
        <p style={{ fontWeight: "500" }}>
          {reviewArr.length} reviews {renderStars(averageRating)}
        </p>
      </div>
      {reviewArr.reverse().map((oneReview) => (
        <div id="one-review" key={oneReview.id}>
          <p>{renderStars(oneReview.rating)}</p>
          <p>{oneReview.review_description}</p>
          <div id="user-icon-and-name">
            <div>
              <i class="fa-solid fa-user"></i>
            </div>
            <div>
              <p>
                {oneReview.user.first_name} {oneReview.user.last_name}
              </p>
            </div>
          </div>
          <div id="one-review-image">
            {oneReview.review_image ? (
              <img id="product-image" src={oneReview.review_image} />
            ) : null}
          </div>
        </div>
      ))}
    </>
  );
}

export default GetAllReviews;
