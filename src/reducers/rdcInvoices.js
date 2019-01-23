import { combineReducers } from 'redux';
import * as act from './actions'; // CONSTANTS FROM ACTIONS

import { getItemPrice, getCustomerId } from '../functions';

const invoiceState = {
  /* invoices */
  invoices: [
    { id: 3301, customer: 'Mark Benson', discount: 10, total: 34.16 },
    { id: 3303, customer: 'Bob Smith', discount: 15, total: 44.15 },
    { id: 3305, customer: 'Mary Jane', discount: 5, total: 26.57 }
  ],
  isAddingInvoice: false,
  newInvoice: {},
  newCustomer: '',
  newTotal: 0,
  newSubTotal: 0,
  newDiscount: 0,
  editingInvoice: 0,
  newInvoiceId: 0
}


export default function rdcInvoices(state = invoiceState, action) {
  const newInvoiceCopy = { ...state.newInvoice};
  const invoiceCopy = [...state.invoices];
  const {
    products = [],
    name = 0,
    value = 0,
    id = 0,
    productsInInvoice = [],
    newProduct = '',
    total = 0
  } = action.payload ? action.payload : {};
  switch (action.type) {
    case act.SET_ADDNEW_ACTIVE:
      const newInvoiceId = getCustomerId();
      return { ...state, isAddingInvoice: !state.isAddingInvoice, newInvoiceId};
    case act.CANCEL_NEW_INVOICE:
      return {
        ...state,
        isAddingInvoice: false,
        newCustomer: '',
        newDiscount: 0,
        newTotal: 0,
        newSubTotal: 0,
        invoiceItems: []
      };
    case act.CHANGE_INPUT_VALUE: // input-customer field
      return { ...state, [name]: value };
    case act.SELECT_PRODUCT:
      const discountForCount = state.newDiscount !== 0 ? (100 - state.newDiscount) / 100 : 1;
      const priceNewProduct = getItemPrice(newProduct, products);
      const newSubTotal = (productsInInvoice.reduce((sum, item) => {
        return sum + item.quantity * item.price
      }, 0) + priceNewProduct).toFixed(2)
      const newTotal = (newSubTotal * discountForCount).toFixed(2);
      return { ...state, newTotal, newSubTotal };
    case act.ADD_NEW_INVOICE:
      newInvoiceCopy.id = state.newInvoiceId;
      newInvoiceCopy.customer = state.newCustomer;
      newInvoiceCopy.total = total;
      newInvoiceCopy.discount = state.newDiscount;
      return {
        ...state,
        invoices: [...invoiceCopy, newInvoiceCopy],
        newCustomer: '',
        newDiscount: 0,
        newTotal: 0,
        newSubTotal: 0,
        invoiceItems: [],
        isAddingInvoice: false,
      };

    case act.CHANGE_PRODUCTQUANTITY:  //in table in quantity-input field
      const productsInInvoiceCopy = [...productsInInvoice];
      const productToChange = productsInInvoiceCopy.find(item => item.name === name);
      productToChange.quantity = value;
      productToChange.total = value * productToChange.price;
      const subTotal1 = (productsInInvoiceCopy.reduce((sum, item) => {
        return sum + item.quantity * item.price;
      }, 0))
        .toFixed(2);
      return { ...state, newSubTotal: subTotal1};

    case act.DELETE_INVOICE:
      const newInvoices = invoiceCopy.filter(item => item.id !== id)
      return { ...state, invoices: newInvoices};
    case act.START_EDITING:
      const invoicesToEdit = invoiceCopy.find(item => item.id === id)
      return {
        ...state,
        isAddingInvoice: true,
        newCustomer: invoicesToEdit.customer,
        newDiscount: invoicesToEdit.discount,
        editingInvoice: id
      };
    case act.FINISH_EDITING:
      const toEditInvoice = invoiceCopy.find(item => item.id === id);
      toEditInvoice.customer = state.newCustomer;
      toEditInvoice.discount = state.newDiscount;
      const productsInInvoiceForEdit = action.payload.productsInInvoice;
      const discountForEdit = state.newDiscount !== 0 ? (100 - state.newDiscount) / 100 : 1;
      const totalForEdit = (productsInInvoiceForEdit.reduce((sum, item) => {
         return sum + item.quantity * item.price
     }, 0)) * discountForEdit;
     toEditInvoice.total = totalForEdit.toFixed(2);
      return {
        ...state,
        invoices: invoiceCopy,
        isAddingInvoice: false,
        newCustomer: '',
        newDiscount: 0,
        editingInvoice: 0
      };
    default:
      return state;
  }
}

