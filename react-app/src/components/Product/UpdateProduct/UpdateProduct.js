import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import {
  getAllProductsThunk,
  getOneProductThunk,
  updateProductThunk,
} from "../../../store/products";
import { useModal } from "../../../context/Modal";

const UpdateProduct = ({ productId }) => {
  // const { productId } = useParams();
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();

  const product = useSelector((state) => state.products.allProducts[productId]);

  const [name, setName] = useState(product.product_name);
  const [description, setDescription] = useState(product.product_description);
  const [category, setCategory] = useState(product.product_category);
  const [price, setPrice] = useState(product.product_price);
  const [productImage, setProductImage] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [errors, setErrors] = useState([]);
  const [createdProduct, setCreatedProduct] = useState(null);
  const [submit, setSubmit] = useState(false);
  useEffect(() => {
    dispatch(getOneProductThunk(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    let errorsObject = {};
    if (!name) errorsObject.name = "Name is required";
    if (name && name.length < 5)
      errorsObject.name = "Name must be longer than 5 characters";
    if (!description) errorsObject.description = "Description is required";
    if (description && description.length > 1000)
      errorsObject.description = "Description exceeds 1000 characters";
    if (description && description.length < 10)
      errorsObject.description =
        "Description must more than 10 characters long";
    if (!category) errorsObject.category = "Category is required";
    if (!price) errorsObject.price = "Please enter a price";
    if (price && price <= 0) errorsObject.price = "Price must be at least $1";
    if (price && price < 0) errorsObject.price = "Price cannot be negative";
    if (price && price > 100000)
      errorsObject.price = "Price cannot exceed $100,000";
    setValidationErrors(errorsObject);
  }, [name, description, category, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("name, cate, desc, price", name, category, description, price);
    const formData = new FormData();
    formData.append("product_name", name);
    formData.append("product_description", description);
    formData.append("product_category", category);
    formData.append("product_price", price);
    formData.append("product_image", productImage);

    dispatch(updateProductThunk(formData, productId)).then((res) => {
      history.push(`/products/${productId}`);
      // closeModal();
    });
    if (Object.keys(validationErrors).length === 0) {
      console.log("🚀🚀🚀🚀🚀🚀 ~ validationErrors:", validationErrors);
      closeModal();
    }

    setSubmit(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <h1>Make changes to your listing here</h1>
        </div>
        <div>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </div>
          {submit && validationErrors.name && (
            <p id="errors">{validationErrors.name}</p>
          )}
          <div>
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </div>
          {submit && validationErrors.description && (
            <p id="errors">{validationErrors.description}</p>
          )}
          <div>
            <label>Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
            />
          </div>
          {submit && validationErrors.category && (
            <p id="errors">{validationErrors.category}</p>
          )}
          <div>
            <label>Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
            />
          </div>
          {submit && validationErrors.price && (
            <p id="errors">{validationErrors.price}</p>
          )}
          <div>
            <label>Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProductImage(e.target.files[0])}
            />
          </div>
        </div>
        <button
          type="submit"
          // disabled={Object.keys(validationErrors).length > 0}
        >
          Update listing
        </button>
      </form>

      {createdProduct && (
        <div>
          <h2>Details of Created Product:</h2>
          <p>Name: {createdProduct.name}</p>
          <p>Description: {createdProduct.product_description}</p>
          <p>Category: {createdProduct.product_category}</p>
          <p>Price: ${createdProduct.product_price}</p>
          <p>Picture: {createdProduct.product_image}</p>
        </div>
      )}
    </>
  );
};

export default UpdateProduct;
