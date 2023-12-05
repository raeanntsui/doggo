import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./CreateReview.css";
import { createReviewThunk } from "../../../store/reviews";
import ReviewForm from "./ReviewForm";
import OpenModalButton from "../../OpenModalButton";

function CreateNewReview({ product }) {
  const [validationErrors, setValidationErrors] = useState({});
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [reviewImage, setReviewImage] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [createdReview, setCreatedReview] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", rating, description, reviewImage);
    const formData = new FormData();
    formData.append("product_rating", rating);
    formData.append("product_description", description);
    formData.append("product_image", reviewImage);

    try {
      const response = await dispatch(createReviewThunk(formData));
      console.log("response", response);
      setCreatedReview(response);

      history.push(`/products/`);
    } catch (error) {
      console.error("Error creating a new review", error);
    }
  };

  useEffect(() => {
    let errorsObject = {};
    if (!rating) errorsObject.rating = "Rating is required";
    if (!description) errorsObject.description = "Description is required";
    if (description && description.length > 500)
      errorsObject.description = "Description cannot exceed 500 characters";
    if (description && description.length < 10)
      errorsObject.description =
        "Please write at least 10 characters for your review";

    setValidationErrors(errorsObject);
  }, [rating, description]);

  return (
    <>
      <button>Post Your Review</button>
    </>
  );
}

export default CreateNewReview;
