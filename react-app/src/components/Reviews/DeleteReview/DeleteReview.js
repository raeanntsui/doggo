import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteReviewThunk } from "../../../store/reviews";
import "./DeleteReview.css";

function DeleteReview({ review }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  //   const history = useHistory();

  const onDeleteButton = async () => {
    await dispatch(deleteReviewThunk(review));
    // history.push(`/products`);
    closeModal();
  };

  const doNotDeleteButton = () => {
    closeModal();
  };
  return (
    <>
      <div>
        <h2>Are you sure you want to remove your review?</h2>
        <div>
          <button onClick={onDeleteButton}>Delete Review</button>
          <button onClick={doNotDeleteButton}>Cancel</button>
        </div>
      </div>
    </>
  );
}

export default DeleteReview;
