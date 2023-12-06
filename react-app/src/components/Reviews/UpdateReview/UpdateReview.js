import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createReviewThunk } from "../../../store/reviews";

function UpdateReviewForm() {
  const { productId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const currentSessionUser = useSelector((state) => state.session.user);
  console.log("🚀🚀🚀🚀🚀🚀 ~ currentSessionUser:", currentSessionUser);

  const [description, setDescription] = useState("");
  const [starRating, setStarRating] = useState(0);
  const [reviewImage, setReviewImage] = useState(null);
  const [hover, setHover] = useState(0);
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  const { closeModal } = useModal();

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
      errorsObject.description = "Review exceeds 500 character limit";
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
    <form onSubmit={handleSubmit}>
      <h2>Leave your review here!</h2>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        // placeholder={setDescription(productId)}
      />
      <p>{submit && errors.description}</p>
      <div className="stars">
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
      <p>{submit && errors.starRating}</p>
      <label>Image</label>
      <input type="text" onChange={(e) => setReviewImage(e.target.value)} />
      <button
        type="submit"
        onClick={handleSubmit}
        // disabled={!checkValidation()}
        // disabled={Object.keys(errors).length > 0}
      >
        Update Your Review
      </button>
    </form>
  );
}

export default UpdateReviewForm;
