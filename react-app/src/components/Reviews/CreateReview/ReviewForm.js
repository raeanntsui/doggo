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
  // const [reviewImage, setReviewImage] = useState(null);
  const [reviewImage, setReviewImage] = useState("");

  const [hover, setHover] = useState(0);
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const currentSessionUser = useSelector((state) => state.session.user);

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
    <>
      {currentSessionUser ? (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div id="create-review-parent">
            <h2
              style={{
                paddingBottom: "10px",
                fontSize: "35px",
                color: "rgb(235, 109, 32)",
              }}>
              Leave your review here!
            </h2>
            <div style={{ paddingBottom: "10px" }}>
              <div>
                <label style={{ fontWeight: "bold", fontSize: "20px" }}>
                  Description
                  <span style={{ color: "red" }}> *</span>
                </label>
              </div>

              <textarea
                style={{
                  height: "50px",
                  width: "400px",
                  paddingLeft: "5px",
                  paddingTop: "5px",
                  // paddingBottom: "10px",
                }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What did you think about this item?"
              />

              <p id="errors">{submit && errors.description}</p>
            </div>
            <div id="create-review-stars">
              <label style={{ fontWeight: "bold", fontSize: "20px" }}>
                Star Rating<span style={{ color: "red" }}> *</span>
              </label>
              <div id="five-stars">
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
            </div>
            <p id="errors">{submit && errors.starRating}</p>
            <div id="image-container" style={{ paddingBottom: "10px" }}>
              <label style={{ fontWeight: "bold", fontSize: "20px" }}>
                Image<span style={{ color: "#d3d3d3" }}> (optional)</span>
              </label>
              <div id="image-input">
                <input
                  style={{
                    paddingLeft: "0px",
                    padding: "5px 0px",
                    width: "35%",
                  }}
                  type="file"
                  accept="image/*"
                  onChange={(e) => setReviewImage(e.target.files[0])}
                />
              </div>
              <div id="post-button-div">
                <button
                  id="post-review-button"
                  type="submit"
                  onClick={handleSubmit}>
                  Post Your Review
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : null}
    </>
  );
}

export default ReviewForm;
