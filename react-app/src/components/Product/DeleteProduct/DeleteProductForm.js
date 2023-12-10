import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./DeleteProduct";
import { useModal } from "../../../context/Modal";
import { deleteProductThunk } from "../../../store/products";

function DeleteProduct({ product }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const [exists, setExists] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(deleteProductThunk(product.id));
    setExists(false);
    closeModal();
  };

  const doNotDeleteAndCloseModal = (event) => {
    event.preventDefault();
    closeModal();
  };

  return (
    <>
      {exists && (
        <div>
          <h2>Are you sure you want to remove this listing</h2>
          <div>
            <button onClick={handleSubmit}>Yes (Delete Listing)</button>
            <button onClick={doNotDeleteAndCloseModal}>
              No (Keep Listing)
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteProduct;
