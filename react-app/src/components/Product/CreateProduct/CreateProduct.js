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
  const [productImage, setProductImage] = useState("");
  const [submit, setSubmit] = useState("false");

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    let errorsObject = {};
    if (!name) errorsObject.name = "Name is required";
    if (!description) errorsObject.description = "Description is required";
    if (description && description.length > 1000)
      errorsObject.description =
        "Description character over limit of 1000 characters";
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
  }, [name, description, category, price, productImage]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmit(true);

    const CreateNewProductOnSubmit = {
      product_name: name,
      product_description: description,
      product_category: category,
      product_price: price,
      product_image: productImage,
    };

    if (Object.keys(validationErrors).length === 0) {
      const res = await dispatch(createProductThunk(CreateNewProductOnSubmit));
      if (!res.errors) {
        history.push(`/spots/${res.id}`);
      }
      setSubmit(false);
    }
  };
  return (
    <>
      <form obSubmit={handleSubmit}>
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
              value={productImage}
              onChange={(e) => setProductImage(e.target.value)}
              placeholder="Image"
            />
          </div>
        </div>
        <button type="submit">Create New Product</button>
      </form>
    </>
  );
}

export default CreateNewProduct;
