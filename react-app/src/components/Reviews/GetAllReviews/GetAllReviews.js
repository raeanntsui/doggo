import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneProductThunk } from "../../../store/products";
import { getAllReviewsThunk } from "../../../store/reviews";
import { useModal } from "../../../context/Modal";
import UpdateReviewForm from "../UpdateReview/UpdateReview";

function GetAllReviews() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  // const [starRating, setStarRating] = useState(review.rating);
  const currentSessionUser = useSelector((state) => state.session.user);
  const currentProduct = useSelector(
    (state) => state.products.allProducts[productId]
  );
  const allReviewsObject = useSelector((state) => state.reviews.allReviews);
  const reviewArr = Object.values(allReviewsObject);
  console.log("🚀🚀🚀🚀🚀🚀 ~ reviewArr:", reviewArr);

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
      {reviewArr.reverse().map((oneReview) => (
        <div key={oneReview.id}>
          <h2>By: {oneReview.user.first_name}</h2>
          <p>{renderStars(oneReview.rating)}</p>
          <h2>{oneReview.review_description}</h2>
          {oneReview.review_image ? (
            <img src={oneReview.review_image} />
          ) : (
            <h1>hi</h1>
          )}
        </div>
      ))}
    </>
  );
}

export default GetAllReviews;
