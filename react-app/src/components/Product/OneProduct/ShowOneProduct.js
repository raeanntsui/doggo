import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneProductThunk } from "../../../store/products";
import DeleteProduct from "../DeleteProduct/DeleteProduct";
import GetAllReviews from "../../Reviews/GetAllReviews/GetAllReviews";
import UpdateProduct from "../UpdateProduct/UpdateProduct";
import ReviewForm from "../../Reviews/CreateReview/ReviewForm";
import "./ShowOneProduct.css";

function ShowOneProduct() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector((state) => state.products.allProducts[productId]);
  console.log("🚀🚀🚀🚀🚀🚀 ~ current product:", product);
  const currentUser = useSelector((state) => state.session.user);
  // console.log("🚀🚀🚀🚀🚀🚀 ~ currentUser:", currentUser);

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
        <h1>Loading</h1>
      )}
      <div>
        {currentUser && currentUser.id !== product.product_owner_id ? (
          <ReviewForm />
        ) : (
          <h1 style={{ color: "red" }}>
            You made this listing, can't leave review
          </h1>
        )}
      </div>
      <div>
        <GetAllReviews />
      </div>
      <div>
        {currentUser.id === product.product_owner_id ? (
          <>
            <h1 style={{ color: "green" }}>
              You made the listing, delete or update the product here:
            </h1>
            <DeleteProduct />
            <UpdateProduct />
          </>
        ) : (
          <h1 style={{ color: "blue" }}>
            You did not make this listing, can't make changes to the listing
          </h1>
        )}
      </div>
    </>
  );
}

export default ShowOneProduct;
