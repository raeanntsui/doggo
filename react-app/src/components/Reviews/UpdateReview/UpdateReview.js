// import React, { useState, useEffect } from "react";
// import { useParams, useHistory } from "react-router-dom";
// import { useModal } from "../../../context/Modal";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createReviewThunk,
//   getAllReviewsThunk,
//   updateReviewThunk,
// } from "../../../store/reviews";
// import "./UpdateReview.css";
// import { getAllProductsThunk } from "../../../store/products";

// function UpdateReviewForm({ reviewId, updatedReviewData }) {
//   const { productId } = useParams();
//   const history = useHistory();
//   const dispatch = useDispatch();

//   const currentSessionUser = useSelector((state) => state.session.user);
//   console.log("🚀🚀🚀🚀🚀🚀 ~ currentSessionUser:", currentSessionUser);

//   const reviews = useSelector((state) => state.reviews.allReviews);
//   console.log("🚀🚀🚀🚀🚀🚀 ~ productReview:", reviews);

//   const [description, setDescription] = useState("");
//   const [starRating, setStarRating] = useState("");
//   const [reviewImage, setReviewImage] = useState("");
//   const [hover, setHover] = useState(0);
//   const [errors, setErrors] = useState({});
//   const [submit, setSubmit] = useState(false);
//   const { closeModal } = useModal();

//   const currentProduct = useSelector(
//     (state) => state.products.allProducts[productId]
//   );
//   console.log("🚀🚀🚀🚀🚀🚀 ~ currentProduct:", currentProduct);

//   useEffect(() => {
//     dispatch(getAllReviewsThunk(productId));
//   }, [dispatch, productId]);

//   useEffect(() => {
//     if (reviewId) {
//       setStarRating(reviewId.starRating || "");
//       setDescription(reviewId.description || "");
//       setReviewImage(reviewId.review_image || "");
//     }
//   }, [reviewId]);

//   if (!productId) {
//     return null;
//   }
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let errorsObject = {};
//     if (!description || description.length < 10)
//       errorsObject.description =
//         "Please write at least 10 characters for your review";
//     if (description && description.length > 500)
//       errorsObject.description = "Review exceeds 500 character limit";
//     if (!starRating) errorsObject.starRating = "Please select a rating";
//     setErrors(errorsObject);

//     const submitReview = {
//       rating: starRating,
//       review_description: description,
//       review_image: reviewImage,
//     };

//     if (Object.keys(errors).length === 0) {
//       setErrors(errorsObject);
//       return;
//     }

//     const form = new FormData();
//     form.append("starRating", starRating);
//     form.append("description", description);
//     form.append("reviewImage", reviewImage);

//     dispatch(updateReviewThunk(form, productId)).then((response) => {
//       if (response.errors) {
//         setErrors(response.errors);
//       } else {
//         history.push(`/products`);
//         setSubmit(true);
//       }
//     });
//   };

//   return (
//     <div id="update-review-form">
//       <form onSubmit={handleSubmit}>
//         <h2>Make changes to your review here</h2>
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           // placeholder={setDescription(productId)}
//         />
//         <p>{submit && errors.description}</p>
//         <div className="stars">
//           <i
//             className={
//               (hover || starRating) >= 1
//                 ? "fa-solid fa-star"
//                 : "fa-regular fa-star"
//             }
//             onMouseEnter={() => setHover(1)}
//             onMouseLeave={() => setHover(0)}
//             onClick={() => setStarRating(1)}
//           />
//           <i
//             className={
//               (hover || starRating) >= 2
//                 ? "fa-solid fa-star"
//                 : "fa-regular fa-star"
//             }
//             onMouseEnter={() => setHover(2)}
//             onMouseLeave={() => setHover(0)}
//             onClick={() => setStarRating(2)}
//           />
//           <i
//             className={
//               (hover || starRating) >= 3
//                 ? "fa-solid fa-star"
//                 : "fa-regular fa-star"
//             }
//             onMouseEnter={() => setHover(3)}
//             onMouseLeave={() => setHover(0)}
//             onClick={() => setStarRating(3)}
//           />
//           <i
//             className={
//               (hover || starRating) >= 4
//                 ? "fa-solid fa-star"
//                 : "fa-regular fa-star"
//             }
//             onMouseEnter={() => setHover(4)}
//             onMouseLeave={() => setHover(0)}
//             onClick={() => setStarRating(4)}
//           />
//           <i
//             className={
//               (hover || starRating) >= 5
//                 ? "fa-solid fa-star"
//                 : "fa-regular fa-star"
//             }
//             onMouseEnter={() => setHover(5)}
//             onMouseLeave={() => setHover(0)}
//             onClick={() => setStarRating(5)}
//           />
//         </div>
//         <p>{submit && errors.starRating}</p>
//         <label>Image</label>
//         <input type="text" onChange={(e) => setReviewImage(e.target.value)} />
//         <button
//           type="submit"
//           onClick={handleSubmit}
//           // disabled={!checkValidation()}
//           //   disabled={Object.keys(errors).length > 0}
//         >
//           Update Your Review
//         </button>
//       </form>
//     </div>
//   );
// }

// export default UpdateReviewForm;

import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  createReviewThunk,
  getAllReviewsThunk,
  updateReviewThunk,
} from "../../../store/reviews";
import "./UpdateReview.css";
import { getAllProductsThunk } from "../../../store/products";

function UpdateReviewForm({ product, review }) {
  const { productId } = useParams();
  //   const { reviewId } = useParams();
  //   console.log("🚀🚀🚀🚀🚀🚀 ~ reviewId:", reviewId);

  const history = useHistory();
  const dispatch = useDispatch();

  const currentSessionUser = useSelector((state) => state.session.user);
  console.log("🚀🚀🚀🚀🚀🚀 ~ currentSessionUser:", currentSessionUser);

  const reviews = useSelector((state) => state.reviews.allReviews);
  console.log("🚀🚀🚀🚀🚀🚀 ~ productReview:", reviews);

  const [description, setDescription] = useState("");
  const [starRating, setStarRating] = useState("");
  const [reviewImage, setReviewImage] = useState("");
  const [hover, setHover] = useState(0);
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  const { closeModal } = useModal();

  //   const currentProduct = useSelector(
  //     (state) => state.products.allProducts[productId]
  //   );
  //   console.log("🚀🚀🚀🚀🚀🚀 ~ currentProduct:", currentProduct);

  useEffect(() => {
    dispatch(getAllReviewsThunk(product.id));
  }, [dispatch, product]);

  useEffect(() => {
    if (review) {
      setStarRating(review.starRating || "");
      setDescription(review.description || "");
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

  if (!product || !currentSessionUser) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitReview = {
      rating: starRating,
      review_description: description,
      review_image: reviewImage,
    };

    // if (Object.keys(errors).length === 0) {
    //     setErrors(errorsObject);
    //   return;
    // }

    // const form = new FormData();
    // form.append("starRating", starRating);
    // form.append("description", description);
    // form.append("reviewImage", reviewImage);

    await dispatch(updateReviewThunk(submitReview, review.id)).then(
      (response) => {
        if (response.errors) {
          setErrors(response.errors);
        } else {
          // history.push(`/products/${product.id}`);
          setSubmit(true);
        }
      }
    );
  };

  return (
    <div id="update-review-form">
      <form onSubmit={handleSubmit}>
        <h2>Make changes to your review here</h2>
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
          //   disabled={Object.keys(errors).length > 0}
        >
          Update Your Review
        </button>
      </form>
    </div>
  );
}

export default UpdateReviewForm;
