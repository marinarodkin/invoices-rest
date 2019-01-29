import { combineReducers } from 'redux';
import * as act from './actions'; // CONSTANTS FROM ACTIONS

import { getItemPrice, getCustomerId } from '../functions';


const invoiceDetailsState = {
  /*invoiceItems*/
  invoiceItems: [],
  newProduct: '',
  newProductTotal: 0,
  newProductPrice: 0,
  invoiceDetails: [
    {
      id: 3303,
      items: [{name: 'Phone Holder', price: 9.99, quantity: 3},
        { name: 'Pet Rock', price: 5.99, quantity: 1 },
    {name: 'Egg Timer', price: 15.99, quantity: 1}]
      },
      {
            id: 3305,
            items: [{name: 'Pet Rock', price: 5.99, quantity: 2},
                {name: 'Egg Timer', price: 15.99, quantity: 1}]
        },
        {
            id: 3301,
            items: [{name: 'Parachute Pants', price: 29.99, quantity: 1},
                {name: 'Egg Timer', price: 15.99, quantity: 1}]
        },
    ],
    invoiceId: 0,

}

export default function rdcInvoiceDetails(state = invoiceDetailsState, action) {
  const invoiceItemsCopy = [...state.invoiceItems];
  const invoiceDetailsCopy = [...state.invoiceDetails]
  const stateCopy = { ...state};
  const { products = [], name = 0, value = 0, id = 0 } = action.payload ? action.payload : {};
  console.log('rdcInvoiceDetails products', products, 'name', name, 'value', value);
  switch (action.type) {
    case act.CHANGE_INVOICEITEMS_VALUE: // input-product field
      const productsCatalog = action.payload.products;
      const price = getItemPrice(value, productsCatalog);
      return { ...state, [name]: value, newProductPrice: price };

    case act.SELECT_PRODUCT:
      const { newProduct } = stateCopy;
      const itemToChange = invoiceItemsCopy.find(item => item.name === newProduct); // checking if this item is already in products table
      if (itemToChange) {
        // when this item is already in table
        itemToChange.quantity = itemToChange.quantity + 1;
        return { ...state, invoiceItems: invoiceItemsCopy, newProductTotal: 0}
      } else {
        // when this item is the first time selected
        const newInvoiceItem = {
          name: newProduct,
          quantity: 1,
          price: getItemPrice(newProduct, products)
       }
        const newInvoiceItems = [...invoiceItemsCopy, newInvoiceItem];
        return { ...state, invoiceItems: newInvoiceItems, newProductTotal: 0 };
      }
    case act.CHANGE_PRODUCTQUANTITY: // in table in quantity-input field
      const productToChange = invoiceItemsCopy.find(item => item.name === name);
      productToChange.quantity = value;
      productToChange.total = value * productToChange.price;
      console.log('invoiceDetailsCopy', invoiceDetailsCopy)
      return { ...state, invoiceItems: invoiceItemsCopy};
    case act.CANCEL_NEW_INVOICE:
      return { ...state, invoiceItems: []};
    case act.ADD_NEW_INVOICE:
      return {
        ...state,
        invoiceDetails: [...invoiceDetailsCopy, { id, items: invoiceItemsCopy }],
        invoiceItems: []
      };
    case act.START_EDITING:
      const invoiceDetailsToEdit = invoiceDetailsCopy.find(item => item.id === id);
      const invoiceDetailsToEditCopy = {...invoiceDetailsToEdit}
      const items = invoiceDetailsToEditCopy.items;
      const itemsCopy = [...items];
      return { ...state, invoiceItems: itemsCopy};
    case act.FINISH_EDITING:
      const editingInvoice = action.payload.id;
      const toEditInvoiceDetails = invoiceDetailsCopy.find(item => item.id === editingInvoice);
      toEditInvoiceDetails.items = state.invoiceItems;
      return { ...state, invoiceDetails: invoiceDetailsCopy, invoiceItems: [], editingInvoice: 0 };
    default:
      return state
}
}

