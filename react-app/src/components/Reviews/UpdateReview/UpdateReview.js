import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviewsThunk, updateReviewThunk } from "../../../store/reviews";
import "./UpdateReview.css";

function UpdateReviewForm({ product, review }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const currentSessionUser = useSelector((state) => state.session.user);
  console.log("🚀🚀🚀🚀🚀🚀 ~ currentSessionUser:", currentSessionUser);

  const reviews = useSelector((state) => state.reviews.allReviews);
  console.log("🚀🚀🚀🚀🚀🚀 ~ productReview:", reviews);

  const [description, setDescription] = useState(review.review_description);
  console.log(
    "🚀🚀🚀🚀🚀🚀 ~ review.review_description:",
    review.review_description
  );
  const [starRating, setStarRating] = useState(review.rating);
  const [reviewImage, setReviewImage] = useState(review.review_image);
  const [hover, setHover] = useState(0);
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    dispatch(getAllReviewsThunk(product.id));
  }, [dispatch, product]);

  useEffect(() => {
    if (review) {
      setStarRating(review.rating || "");
      setDescription(review.review_description || "");
      setReviewImage(review.review_image || "");
    }
  }, [review]);

  useEffect(() => {
    let errorsObject = {};
    if (!description || description.length < 10)
      errorsObject.description =
        "Please write at least 10 characters for your review";
    if (description && description.length > 500)
      errorsObject.description = "Review exceeds 500 character limit";
    if (!starRating) errorsObject.starRating = "Please select a rating";
    setErrors(errorsObject);
  }, [starRating, description]);

  if (!product.id || !currentSessionUser) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitReview = {
      rating: starRating,
      review_description: description,
      review_image: reviewImage,
    };

    if (Object.keys(errors).length === 0) {
      await dispatch(updateReviewThunk(review.id, submitReview));
      closeModal();
    }
    console.log("🚀🚀🚀🚀🚀🚀 ~ errors:", errors);
    setSubmit(true);
  };

  const cancelButton = () => {
    closeModal();
  };

  return (
    <div id="update-review-form">
      <form onSubmit={handleSubmit}>
        <h2 style={{ paddingBottom: "20px" }}>
          Changed your mind about the review?
        </h2>
        <label>Description</label>
        <textarea
          style={{
            width: "100%",
            height: "40px",
          }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <p id="errors">{submit && errors.description}</p>
        <label style={{ paddingTop: "20px", paddingBottom: "0px" }}>
          Star Rating
        </label>
        <div
          className="stars"
          style={{ padding: "10px 0px", fontSize: "30px" }}>
          <i
            className={
              (hover || starRating) >= 1
                ? "fa-solid fa-star"
                : "fa-regular fa-star"
            }
            onMouseEnter={() => setHover(1)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setStarRating(1)}
          />
          <i
            className={
              (hover || starRating) >= 2
                ? "fa-solid fa-star"
                : "fa-regular fa-star"
            }
            onMouseEnter={() => setHover(2)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setStarRating(2)}
          />
          <i
            className={
              (hover || starRating) >= 3
                ? "fa-solid fa-star"
                : "fa-regular fa-star"
            }
            onMouseEnter={() => setHover(3)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setStarRating(3)}
          />
          <i
            className={
              (hover || starRating) >= 4
                ? "fa-solid fa-star"
                : "fa-regular fa-star"
            }
            onMouseEnter={() => setHover(4)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setStarRating(4)}
          />
          <i
            className={
              (hover || starRating) >= 5
                ? "fa-solid fa-star"
                : "fa-regular fa-star"
            }
            onMouseEnter={() => setHover(5)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setStarRating(5)}
          />
        </div>
        <p id="errors">{submit && errors.starRating}</p>
        <div>
          {/* <label style={{ textAlign: "center" }}>Image</label> */}
          <input
            style={{
              width: "185px",
              // border: "2px solid red",
              padding: "0px",
              margin: "0px",
              display: "flex",
            }}
            type="file"
            onChange={(e) => setReviewImage(e.target.value)}
          />
        </div>
        <div
          style={{
            paddingTop: "10px",
            display: "inline-flex",
            gap: "15px",
          }}>
          <div style={{ display: "inline-flex" }}>
            <button
              id="update-review-button"
              type="submit"
              onClick={handleSubmit}>
              Update Your Review
            </button>
          </div>
          <div>
            <button id="cancel-button" onClick={cancelButton}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateReviewForm;
