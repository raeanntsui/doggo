import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./CreateProduct.css";
import { createProductThunk } from "../../../store/products";

function CreateNewProduct() {
  const [validationErrors, setValidationErrors] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [submit, setSubmit] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product_name", name);
    formData.append("product_description", description);
    formData.append("product_category", category);
    formData.append("product_price", price);
    formData.append("product_image", productImage);

    if (Object.keys(validationErrors).length === 0) {
      await dispatch(createProductThunk(formData)).then((res) => {
        console.log("🚀🚀🚀🚀🚀🚀 ~ res:", res);
        history.push(`/products/${res.id}`);
      });
    }
    setSubmit(true);
  };

  useEffect(() => {
    let errorsObject = {};
    if (!name) errorsObject.name = "Please enter a name for your listing";
    if (name && name.length < 5)
      errorsObject.name = "Name must be longer than 5 characters";
    if (!description)
      errorsObject.description = "Please enter a description for your listing";
    if (description && description.length > 1000)
      errorsObject.description = "Description exceeds 1000 character limit";
    if (description && description.length < 10)
      errorsObject.description =
        "Description must more than 10 characters long";
    if (!category)
      errorsObject.category = "Please enter a category for your listing";
    if (!price) errorsObject.price = "Please enter a price for your listing";
    if (price && price <= 0) errorsObject.price = "Price must be at least $1";
    if (price && price < 0) errorsObject.price = "Price cannot be negative";
    if (price && price > 100000)
      errorsObject.price = "Price cannot exceed $100,000";
    if (!productImage)
      errorsObject.productImage = "Please submit an image for your listing";
    setValidationErrors(errorsObject);
  }, [name, description, category, price, productImage]);

  return (
    <>
      <form
        id="create-product-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data">
        <div>
          <h1 style={{ textAlign: "center", padding: "10px" }}>
            What do you want to sell?
          </h1>
        </div>
        <div>
          <div>
            <label>
              Name<span style={{ color: "red" }}> *</span>
            </label>
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
            <label>
              Description<span style={{ color: "red" }}> *</span>
            </label>
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
            <label>
              Category<span style={{ color: "red" }}> *</span>
            </label>
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
            <label>
              Price<span style={{ color: "red" }}> *</span>
            </label>
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
            <label>
              Image<span style={{ color: "red" }}> *</span>
            </label>
            <input
              style={{ padding: "0px" }}
              type="file"
              accept="image/*"
              onChange={(e) => setProductImage(e.target.files[0])}
            />
            {submit && validationErrors.productImage && (
              <p id="errors">{validationErrors.productImage}</p>
            )}
          </div>
        </div>
        <div id="submit-button-div">
          <button
            id="submit-button"
            type="submit"
            // disabled={Object.keys(validationErrors).length > 0}
          >
            Create New Product
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateNewProduct;
