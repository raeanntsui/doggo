import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneProductThunk } from "../../../store/products";
import "./ShowOneProduct.css";

function ShowOneProduct() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector((state) => state.products.allProducts[productId]);
  console.log("🚀🚀🚀🚀🚀🚀 ~ one product:", product);
  //   const currentUser = useSelector((state) => state.session.user);
  //   console.log("🚀🚀🚀🚀🚀🚀 ~ currentUser:", currentUser);

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
        <h1>No product information available</h1>
      )}
    </>
  );
}

export default ShowOneProduct;
