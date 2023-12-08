import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createReviewThunk } from "../../../store/reviews";
import "./CreateReview.css";

function ReviewForm() {
  const { productId } = useParams();
  const [description, setDescription] = useState("");
  const [starRating, setStarRating] = useState(0);
  const [reviewImage, setReviewImage] = useState(null);
  const [hover, setHover] = useState(0);
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const currentSessionUser = useSelector((state) => state.session.user);
  console.log("🚀🚀🚀🚀🚀🚀 ~ currentSessionUser:", currentSessionUser);
  const currentProduct = useSelector(
    (state) => state.products.allProducts[productId]
  );
  console.log("🚀🚀🚀🚀🚀🚀 ~ currentProduct:", currentProduct);

  const checkValidation = () => {
    return description.length > 10 && description.length < 500 && starRating;
  };

  useEffect(() => {
    let errorsObject = {};
    if (!description || description.length < 10)
      errorsObject.description =
        "Please write at least 10 characters for your review";
    if (description && description.length > 500)
      errorsObject.description = "Your review exceeds the 500 character limit";
    if (!starRating)
      errorsObject.starRating =
        "Please select a rating before submitting your review!";
    setErrors(errorsObject);
  }, [description, starRating]);

  const handleSubmit = async (e) => {
    if (!productId) {
      return null;
    }

    e.preventDefault();
    setSubmit(true);

    const submitReview = {
      rating: starRating,
      review_description: description,
      review_image: reviewImage,
    };

    if (Object.keys(errors).length === 0) {
      dispatch(createReviewThunk(submitReview, productId));
      closeModal();
      setSubmit(false);
      return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div id="create-review-parent">
        <h2 style={{ paddingBottom: "10px", fontSize: "32px" }}>
          Leave your review here!
        </h2>
        <div>
          <label>Description</label>
          <textarea
            style={{
              height: "50px",
              width: "400px",
              paddingLeft: "5px",
              paddingTop: "5px",
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What did you think about this item?"
          />

          <p id="errors">{submit && errors.description}</p>
        </div>
        <div id="create-review-stars">
          <label>Star Rating</label>
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
        <label>Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setReviewImage(e.target.files[0])}
        />
        <div id="post-button-div">
          <button id="post-review-button" type="submit" onClick={handleSubmit}>
            Post Your Review
          </button>
        </div>
      </div>
    </form>
  );
}

export default ReviewForm;
