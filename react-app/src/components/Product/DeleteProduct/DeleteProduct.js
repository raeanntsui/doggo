import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./DeleteProduct.css";
import { useModal } from "../../../context/Modal";
import { deleteProductThunk } from "../../../store/products";

function DeleteProduct({ productId }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();

  const onDeleteButton = async () => {
    await dispatch(deleteProductThunk(productId));
    history.push(`/products`);
    closeModal();
  };

  const doNotDeleteButton = () => {
    closeModal();
  };

  return (
    <>
      <div>
        <h2>Are you sure you want to remove this listing?</h2>
        <div id="delete-review-button">
          <button id="top-button-delete" onClick={onDeleteButton}>
            Delete Listing
          </button>
          <button onClick={doNotDeleteButton}>Cancel</button>
        </div>
      </div>
    </>
  );
}

export default DeleteProduct;
