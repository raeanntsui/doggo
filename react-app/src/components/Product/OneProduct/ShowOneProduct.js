import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneProductThunk } from "../../../store/products";
import "./ShowOneProduct.css";
import DeleteProduct from "../DeleteProduct/DeleteProduct";
import GetAllReviews from "../../Reviews/GetAllReviews/GetAllReviews";
import UpdateProduct from "../UpdateProduct/UpdateProduct";
import OpenModalButton from "../../OpenModalButton/index";
import ReviewForm from "../../Reviews/CreateReview/ReviewForm";
import CreateNewReview from "../../Reviews/CreateReview/CreateReview";

function ShowOneProduct() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector((state) => state.products.allProducts[productId]);
  // console.log("🚀🚀🚀🚀🚀🚀 ~ one product:", product);
  const currentUser = useSelector((state) => state.session.user);
  // console.log("🚀🚀🚀🚀🚀🚀 ~ currentUser:", currentUser);
  // const { OpenModalButton } = useModal();

  useEffect(() => {
    dispatch(getOneProductThunk(productId));
  }, [dispatch]);

  if (!product) return null;

  return (
    <>
      {product ? (
        <div>
          <h1>Information about Product ID: {productId}</h1>

          <h1>Product Owner ID:{product.product_owner_id}</h1>
          <h1>{product.product_description}</h1>
          <h1>Category: {product.product_category}</h1>
          <h1>${product.product_price}</h1>
          <img src={product.product_image} />
        </div>
      ) : (
        <h1>
          Loading product information or no product information available?
        </h1>
      )}
      <div>
        <GetAllReviews />
      </div>
      <div>
        {currentUser.id === product.product_owner_id ? (
          <>
            {/* <OpenModalButton
              buttonText="Delete Listing"
              modalComponent={<DeleteProduct />}
            />
            <OpenModalButton
              buttonText="Update Listing"
              modalComponent={<UpdateProduct />}
            /> */}
            <DeleteProduct />
            <UpdateProduct />
          </>
        ) : (
          <h1>
            Don't show Delete or Update listing button (not owner of listing)
          </h1>
        )}
      </div>
      <div>
        {/* <CreateNewReview /> */}
        <OpenModalButton
          buttonText="Create a review"
          modalComponent={<ReviewForm />}
        />
        {/* <button>Post your review</button> */}
        {/* <ReviewForm /> */}
      </div>
    </>
  );
}

export default ShowOneProduct;
