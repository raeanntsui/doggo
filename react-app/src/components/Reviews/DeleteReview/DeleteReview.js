import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteReviewThunk } from "../../../store/reviews";
import "./DeleteReview.css";

function DeleteReview({ review }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const onDeleteButton = async () => {
    await dispatch(deleteReviewThunk(review));
    closeModal();
  };

  const doNotDeleteButton = () => {
    closeModal();
  };
  return (
    <>
      <div id="delete-review-modal-parent">
        <h2 style={{ paddingBottom: "15px" }}>
          Do you really want to delete your review?
        </h2>
        <div id="delete-review-modal-buttons">
          <div>
            <button id="delete-review-button-2" onClick={onDeleteButton}>
              Delete Review
            </button>
          </div>
          <div>
            <button id="cancel-review-button" onClick={doNotDeleteButton}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteReview;
