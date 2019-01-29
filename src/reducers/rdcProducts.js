import * as act from './actions'; // CONSTANTS FROM ACTIONS

import { getCustomerId } from '../functions';

const productState = {
  /* products */
  products: [
    {
      id: 2201,
      name: 'Parachute Pants',
      price: 29.99,
      createdAt: '2018-12-28 15:15:52.701 +00:00',
      updatedAt: '2018-12-28 15:15:52.701 +00:00'
    },
    {
      id: 2202,
      name: 'Phone Holder',
      price: 9.99,
      createdAt: '2018-12-28 15:15:52.701 +00:00',
      updatedAt: '2018-12-28 15:15:52.701 +00:00'
    },
    {
      id: 2203,
      name: 'Pet Rock',
      price: 5.99,
      createdAt: '2018-12-28 15:15:52.701 +00:00',
      updatedAt: '2018-12-28 15:15:52.701 +00:00'
    },
    {
      id: 2204,
      name: 'Egg Timer',
      price: 15.99,
      createdAt: '2018-12-28 15:15:52.702 +00:00',
      updatedAt: '2018-12-28 15:15:52.702 +00:00'
    },
    {
      id: 2205,
      name: 'Neon Green Hat',
      price: 21.99,
      createdAt: '2018-12-28 15:15:52.702 +00:00',
      updatedAt: '2018-12-28 15:15:52.702 +00:00'
    }
  ],
  productName: '',
  productPrice: '',
  products2: [],
  productModalShow: false,
  editingProduct: 0
};

export default function rdcProducts(state = productState, action) {
  const productsCopy = [...state.products];
  switch (action.type) {
    case act.FETCH_PRODUCTS_SUCCESSFUL:
      console.log(action.payload, '----action.payload');
      return {
        ...state,
        products2: action.payload
      };
    case act.CHANGE_INPUT_PRODUCT_VALUE:
      const value = action.payload.target.value;
      console.log(action.payload.target.value);
      const name = action.payload.target.name;
      return { ...state, [name]: value };
    case act.ADD_NEW_PRODUCT:
      const { productName, productPrice } = state;
      const newProduct = { id: getCustomerId(), name: productName, price: productPrice * 1 };
      const newProducts = [...productsCopy, newProduct];
      return {
        ...state,
        products: newProducts,
        productName: '',
        productPrice: '',
        productModalShow: false
      };
    case act.PRODUCT_MODAL_SHOW:
      return { ...state, productModalShow: true };
    case act.PRODUCT_MODAL_HIDE:
      return { ...state, productModalShow: false };
    case act.DELETE_PRODUCT:
      const idForDelete = action.payload;
      const updatedProducts = productsCopy.filter(item => item.id != idForDelete);
      return { ...state, products: updatedProducts };
    case act.START_EDITING_PRODUCT:
      const idForEdit = action.payload;
      const productToEdit = productsCopy.find(item => item.id === idForEdit);
      return {
        ...state,
        productModalShow: true,
        productName: productToEdit.name,
        productPrice: productToEdit.price,
        editingProduct: idForEdit
      };
    case act.FINISH_EDITING_PRODUCT:
      const editingProduct = action.payload;
      const toEditProduct = productsCopy.find(item => item.id === editingProduct);
      toEditProduct.name = state.productName;
      toEditProduct.price = state.productPrice;

      return {
        ...state,
        products: productsCopy,
        productModalShow: false,
        productName: '',
        productPrice: '',
        editingProduct: 0
      };
    default:
      return state;
  }
}
