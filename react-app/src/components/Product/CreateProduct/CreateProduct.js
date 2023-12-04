import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./CreateProduct.css";
import { createProductThunk } from "../../../store/products";

function CreateNewProduct() {
  const [validationErrors, setValidationErrors] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [createdProduct, setCreatedProduct] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", name, description, category, price, productImage);
    const formData = new FormData();
    formData.append("product_name", name);
    formData.append("product_description", description);
    formData.append("product_category", category);
    formData.append("product_price", price);
    formData.append("product_image", productImage);

    try {
      const response = await dispatch(createProductThunk(formData));
      setCreatedProduct(response);

      history.push(`/products/`);
    } catch (error) {
      console.error("Error creating a new product:", error);
    }
  };

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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Create a new product here</h1>
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
            <p id="p-error">{validationErrors.name}</p>
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
          Create New Product
        </button>
      </form>

      {createdProduct && (
        <div>
          <h2>Details of Created Product:</h2>
          <p>Name: {createdProduct.product_name}</p>
          <p>Description: {createdProduct.product_description}</p>
          <p>Category: {createdProduct.product_category}</p>
          <p>Price: ${createdProduct.product_price}</p>
          <p>Picture: {createdProduct.product_image}</p>
        </div>
      )}
    </>
  );
}

export default CreateNewProduct;
