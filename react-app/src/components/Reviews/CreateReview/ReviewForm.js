import React, { useState, useEffect } from "react";
import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createReviewThunk } from "../../../store/reviews";

function ReviewForm({ product }) {
  const [description, setDescription] = useState("");
  const [starRating, setStarRating] = useState(0);
  const [reviewImage, setReviewImage] = useState(null);
  const [hover, setHover] = useState(0);
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);

  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const user = useSelector((state) => state.session.user);

  const checkValidation = () => {
    return description.length > 10 && starRating;
  };

  useEffect(() => {
    let errorsObject = {};
    if (!description || description.length < 10)
      errorsObject.description =
        "Please write at least 10 characters for your review";

    setErrors(errorsObject);
  }, [description]);

  const handleSubmit = async (e) => {
    if (!product.id) {
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
      dispatch(createReviewThunk(submitReview, product.id));
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
        placeholder="Leave your review here..."
      />
      <p>{submit && errors.description}</p>
      <label>Image</label>
      <input type="file" onChange={(e) => setReviewImage(e.target.files[0])} />
      <p>{submit && errors.user_img}</p>
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
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={!checkValidation()}>
        Submit Your Review
      </button>
    </form>
  );
}

export default ReviewForm;
