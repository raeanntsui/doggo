import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneProductThunk } from "../../../store/products";
import DeleteProduct from "../DeleteProduct/DeleteProduct";
import GetAllReviews from "../../Reviews/GetAllReviews/GetAllReviews";
import UpdateProduct from "../UpdateProduct/UpdateProduct";
import ReviewForm from "../../Reviews/CreateReview/ReviewForm";
import "./ShowOneProduct.css";
import UpdateReviewForm from "../../Reviews/UpdateReview/UpdateReview";
import OpenModalButton from "../../OpenModalButton";

function ShowOneProduct() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector((state) => state.products.allProducts[productId]);
  const currentUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.reviews.allReviews);
  const reviewsObj = Object.values(reviews);

  useEffect(() => {
    dispatch(getOneProductThunk(productId));
  }, [dispatch]);

  if (!product) return null;

  let existingReview;
  if (currentUser) {
    existingReview = reviewsObj.find(
      (review) => review.user_id === currentUser.id
    );
  }

  return (
    <>
      {product ? (
        <div>
          <h1>Product Owner ID: {product.product_owner_id}</h1>
          <h3>Listing created by: {product.user.first_name}</h3>
          <h3>Description: {product.product_description}</h3>
          <h3>Category: {product.product_category}</h3>
          <h3>Price: ${product.product_price}</h3>
          <img src={product.product_image} alt="Product" />
        </div>
      ) : (
        <h1>Loading</h1>
      )}

      <div>
        {currentUser &&
        !existingReview &&
        currentUser.id !== product.product_owner_id ? (
          <ReviewForm />
        ) : currentUser && existingReview ? (
          <>
            <h1 style={{ color: "red" }}>You already wrote a review here</h1>
            <UpdateReviewForm review={existingReview} product={product} />
          </>
        ) : (
          <h1 style={{ color: "red" }}>
            Can't leave a review (not logged in, already wrote a review, or
            owner of product)
          </h1>
        )}
      </div>

      <div>
        <GetAllReviews />
      </div>

      <div>
        {currentUser && currentUser.id === product.product_owner_id ? (
          <>
            <h1 style={{ color: "green" }}>
              You made the listing, delete or update the product here:
            </h1>
            <OpenModalButton
              buttonText="Delete Listing"
              modalComponent={
                <DeleteProduct productId={productId} />
              }></OpenModalButton>
            <OpenModalButton
              buttonText="Update Listing"
              modalComponent={
                <UpdateProduct productId={productId} />
              }></OpenModalButton>
            {/* <UpdateProduct /> */}
          </>
        ) : (
          <h1 style={{ color: "blue" }}>
            You did not make this listing, can't update or delete it
          </h1>
        )}
      </div>
    </>
  );
}

export default ShowOneProduct;
