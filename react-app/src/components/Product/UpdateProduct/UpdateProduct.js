import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import {
  getAllProductsThunk,
  getOneProductThunk,
  updateProductThunk,
} from "../../../store/products";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productId } = useParams();
  console.log("🚀🚀🚀🚀🚀🚀 ~ productId:", productId);

  const products = useSelector((state) => state.products.allProducts);
  console.log("🚀🚀🚀🚀🚀🚀 ~ products:", products);

  const product = products[productId];
  console.log("🚀🚀🚀🚀🚀🚀 ~ product:", product);

  const [name, setName] = useState(product.product_name);
  const [description, setDescription] = useState(product.product_description);
  console.log("🚀🚀🚀🚀🚀🚀 ~ description:", description);
  const [category, setCategory] = useState(product.product_category);
  console.log("🚀🚀🚀🚀🚀🚀 ~ category:", category);
  const [price, setPrice] = useState(product.product_price);
  console.log("🚀🚀🚀🚀🚀🚀 ~ price:", price);
  const [productImage, setProductImage] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [errors, setErrors] = useState([]);
  const [createdProduct, setCreatedProduct] = useState(null);
  console.log("name", name);
  useEffect(() => {
    dispatch(getOneProductThunk(productId));
    // .then((res) => {
    // console.log("res", res);
    // setName(res.name);
    // setDescription(res.description);
    // setCategory(res.category);
    // setPrice(res.price);
    // setProductImage(res.productImage);
    // });
  }, [dispatch, productId]);

  useEffect(() => {
    let errorsObject = {};
    if (!name) errorsObject.name = "Name is required";
    if (!description) errorsObject.description = "Description is required";
    if (description && description.length > 1000)
      errorsObject.description =
        "Description character over the limit of 1000 characters";
    if (description && description.length < 10)
      errorsObject.description =
        "Description must be longer than 10 characters long";
    if (!category) errorsObject.category = "Category is required";
    if (!price) errorsObject.price = "Price is required";
    if (price && price < 0)
      errorsObject.price = "Price must be greater than $1";
    if (price && price > 100000)
      errorsObject.price = "Price cannot exceed $100,000";
    setValidationErrors(errorsObject);
  }, [name, description, category, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("name, cate, desc, price", name, category, description, price);
    const formData = new FormData();
    formData.append("product_name", name);
    formData.append("product_description", description);
    formData.append("product_category", category);
    formData.append("product_price", price);
    formData.append("product_image", productImage);
    console.log();

    dispatch(updateProductThunk(formData, productId)).then((res) => {
      history.push(`/products/${productId}`);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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
          {/* {submit && validationErrors.name && (
            <p id="p-error">{validationErrors.name}</p>
          )} */}
          <div>
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </div>
          <div>
            <label>Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
            />
          </div>
          <div>
            <label>Image</label>
            <input
              type="text"
              onChange={(e) => setProductImage(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={Object.keys(validationErrors).length > 0}>
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
