// constants
const GET_ALL_PRODUCTS = "products/GET_ALL_PRODUCTS";
const GET_ONE_PRODUCT = "products/GET_ONE_PRODUCT";
const CREATE_PRODUCT = "products/CREATE_PRODUCT";
const UPDATE_PRODUCT = "products/UPDATE_PRODUCT";
const DELETE_PRODUCT = "products/DELETE_PRODUCT";

// action creators
const getAllProducts = (products) => {
  return {
    type: GET_ALL_PRODUCTS,
    products,
  };
};

const getOneProduct = (product) => {
  return {
    type: GET_ONE_PRODUCT,
    product,
  };
};

const createProduct = (newProduct) => {
  return {
    type: CREATE_PRODUCT,
    newProduct,
  };
};

const updateProduct = (product) => {
  return {
    type: UPDATE_PRODUCT,
    product,
  };
};

const deleteProduct = (id) => {
  return {
    type: DELETE_PRODUCT,
    id,
  };
};

// thunk
export const getAllProductsThunk = () => async (dispatch) => {
  const res = await fetch("/api/products/");
  if (res.ok) {
    const products = await res.json();
    dispatch(getAllProducts(products));
    return products;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const getOneProductThunk = (productId) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}`);
  if (res.ok) {
    const product = await res.json();
    dispatch(getOneProduct(product));
    return product;
  }
};

export const createProductThunk = (newProduct) => async (dispatch) => {
  try {
    const res = await fetch("/api/products/new", {
      method: "POST",
      body: newProduct,
    });
    const createdProduct = await res.json();
    dispatch(createProduct(createdProduct));
    return createdProduct;
  } catch (error) {
    console.error("Error creating new product:", error);
  }
};

export const updateProductThunk = (formData, productId) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}`, {
    method: "PUT",
    body: formData,
  });
  if (res.ok) {
    const product = await res.json();
    dispatch(updateProduct(product));
    return product;
  } else {
    const data = await res.json();
    return data;
  }
};

export const deleteProductThunk = (productId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const productError = await res.json();
      throw new Error(productError.message);
    }
    dispatch(deleteProduct(productId));
  } catch (error) {
    console.error("Error deleting product", error.message);
  }
};

// initial state
const initialState = {
  allProducts: {},
};

// reducer
const productsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      newState = { ...state, allProducts: {} };
      action.products.forEach((product) => {
        newState.allProducts[product.id] = product;
      });
      return newState;

    case GET_ONE_PRODUCT:
      newState = { ...state, allProducts: { ...state.allProducts } };
      newState.allProducts[action.product.id] = action.product;
      return newState;

    case CREATE_PRODUCT:
      newState = { ...state, allProducts: { ...state.allProducts } };
      newState.allProducts[action.newProduct.id] = action.newProduct;
      return newState;

    case UPDATE_PRODUCT:
      newState = {
        ...state,
        allProducts: { ...state.allProducts },
      };
      newState.allProducts[action.product.id] = action.product;

      return newState;

    case DELETE_PRODUCT:
      newState = { ...state, allProducts: { ...state.allProducts } };
      delete newState.allProducts[action.id];
      return newState;

    default:
      return state;
  }
};

export default productsReducer;
