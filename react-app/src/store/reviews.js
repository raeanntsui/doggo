// action constants
const GET_ALL_REVIEWS = "reviews/GET_ALL_REVIEWS";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";
const UPDATE_REVIEW = "reviews/UPDATE_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

// action
const getAllReviews = (reviews) => ({
  type: GET_ALL_REVIEWS,
  reviews,
});

const createReview = (review) => ({
  type: CREATE_REVIEW,
  review,
});

const updateReview = (newReview) => ({
  type: UPDATE_REVIEW,
  newReview,
});

const deleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId,
  };
};

// thunks
export const getAllReviewsThunk = (productId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/reviews/${productId}`);
    if (res.ok) {
      const reviews = await res.json();
      dispatch(getAllReviews(reviews));
      return reviews;
    }
  } catch (e) {
    return await e.json();
  }
};

export const createReviewThunk = (review, productId) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append("rating", review.rating);
    formData.append("review_description", review.review_description);
    formData.append("review_image", review.review_image);

    const res = await fetch(`/api/reviews/new/${productId}`, {
      method: "POST",
      body: formData,
    });

    console.log("🚀🚀🚀 ~ res:", res);

    if (res.ok) {
      const review = await res.json();
      dispatch(createReview(review.new_review));
      await dispatch(getAllReviewsThunk(productId));
      return review.new_review;
    } else {
      console.error(`Server error: ${res.status}`);
    }
  } catch (e) {
    console.error("Error in createReviewThunk:", e);
    return await e.json();
  }
};

export const updateReviewThunk = (reviewId, formData) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: "PUT",
    body: formData,
  });

  if (res.ok) {
    const updatedReview = await res.json();
    dispatch(updateReview(updatedReview.updateReview));
    return updatedReview.updateReview;
  } else {
    console.log("error updating review");
  }
  console.log("🚀🚀🚀🚀🚀🚀 ~ res:", res);
};

// delete review thunk
export const deleteReviewThunk = (review) => async (dispatch) => {
  let res;
  try {
    res = await fetch(`/api/reviews/${review.id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      dispatch(deleteReview(review.id));
    }
  } catch (e) {
    return await e.json();
  }
};

const initialState = {
  allReviews: {},
};

const reviewsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_REVIEWS:
      newState = { ...state, allReviews: {} };
      if (action.reviews) {
        action.reviews.forEach((review) => {
          newState.allReviews[review.id] = review;
        });
      }
      return newState;
    case CREATE_REVIEW:
      newState = {
        ...state,
        allReviews: { ...state.allReviews },
      };
      newState.allReviews[action.review.id] = action.review;
      return newState;

    case UPDATE_REVIEW:
      newState = {
        ...state,
        allReviews: { ...state.allReviews },
      };
      newState.allReviews[action.newReview.id] = action.newReview;
      return newState;

    case DELETE_REVIEW:
      newState = {
        ...state,
        allReviews: { ...state.allReviews },
      };
      delete newState.allReviews[action.reviewId];
      return newState;

    default:
      return state;
  }
};

export default reviewsReducer;
