import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showPassword: false,
  userProfile: null,
  productList: [],
  formData: {
    username: "",
    email: "",
    password: "",
  },
  formContact: {
    firstName: "",
    email: "",
    subject: "",
    message: "",
  },
  formCreateProduct: {
    name: "",
    image: "",
    price: "",
    category: "",
    description: "",
  },
  formEditProduct: {
    name: "",
    image: "",
    price: "",
    category: "All",
    description: "",
  },
  hoverCart: false,
  isSidebarOpen: false,
  sendingFormContact: false,
  userId: "",
  categoriesData: null,
  category: "",
  searchDiscover: ''
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleShowPassword: (state, { payload }) => {
      state.showPassword = payload;
    },
    setUserProfile: (state, { payload }) => {
      state.userProfile = payload;
    },
    setProductList: (state, { payload }) => {
      state.productList = payload;
    },
    setFormData: (state, { payload }) => {
      state.formData = { ...state.formData, ...payload };
    },
    setFormContact: (state, { payload }) => {
      state.formContact = { ...state.formContact, ...payload };
    },
    setFormCreateProduct: (state, { payload }) => {
      state.formCreateProduct = { ...state.formCreateProduct, ...payload };
    },
    resetFormCreateProduct: (state) => {
      state.formCreateProduct = initialState.formCreateProduct;
    },
    resetFormData: (state) => {
      state.formData = initialState.formData;
    },
    clearFormCreateProductImage: (state) => {
      state.formCreateProduct = {...state.formCreateProduct, image: ""}
    },
    clearFormEditProductImage: (state) => {
      state.formEditProduct = {...state.formEditProduct, image: ""}
    },
    clearFormContact: (state) => {
      state.formContact = initialState.formContact
    },
    setFormEditProduct: (state, { payload }) => {
      state.formEditProduct = { ...state.formEditProduct, ...payload };
    },
    openHoverCart: (state) => {
      state.hoverCart = true;
    },
    closeHoverCart: (state) => {
      state.hoverCart = false;
    },
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
    logoutUser: (state) => {
      state.userProfile = null;
    },
    setSendingFormContact: (state, { payload }) => {
      state.sendingFormContact = payload
    },
    setTrackUserId: (state, { payload }) => {
      state.userId = payload;
    },
    setSearchDiscover: (state, { payload }) => {
      state.searchDiscover = payload;
    },
    clearSearchDiscover: (state) => {
      state.searchDiscover = ""
    },
    getCategoriesProduct: (state, { payload }) => {
      state.categoriesData = [...state.categoriesData, ...payload];
    },
    setCategory: (state, { payload }) => {
      state.category = payload;
    }
  },
});

export const {
  toggleShowPassword,
  setUserProfile,
  setProductList,
  setFormData,
  resetFormData,
  resetFormCreateProduct,
  setFormCreateProduct,
  openSidebar,
  closeSidebar,
  clearFormCreateProductImage,
  clearFormEditProductImage,
  setFormEditProduct,
  openHoverCart,
  closeHoverCart,
  logoutUser,
  setFormContact,
  clearFormContact,
  setSendingFormContact,
  setTrackUserId,
  getCategoriesProduct,
  setCategory,
  setSearchDiscover,
  clearSearchDiscover
} = globalSlice.actions;

export default globalSlice.reducer;
