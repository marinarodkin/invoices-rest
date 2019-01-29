import * as act from './actions'; // CONSTANTS FROM ACTIONS

import { getCustomerId } from '../functions';

const customerState = {
  /* customers */
  customers: [],
  customerName: '',
  customerAddress: '',
  customerPhone: '',
  customerModalShow: false,
  editingCustomer: 0,
  customerArr: []
};

export default function rdcCustomers(state = customerState, action) {
  const customersCopy = [...state.customers];
  const { customerName = '', customerAddress = '', customerPhone = '' } = state;
  switch (action.type) {
    case act.FETCH_CUSTOMERS_SUCCESSFUL:
      return {
        ...state,
        customers: action.payload
      };
    case act.CHANGE_INPUT_CUSTOMER_VALUE:
      const { value = '', name = '' } = action.payload ? action.payload.target : {};
      return { ...state, [name]: value };
    case act.CUSTOMER_MODAL_SHOW:
      return { ...state, customerModalShow: true };
    case act.CUSTOMER_MODAL_HIDE:
      return { ...state, customerModalShow: false };
    case act.FETCH_DELETE_CUSTOMERS_SUCCESSFUL:
      console.log(action.payload, '----rcd delete customers action.payload');
      const idForDelete = action.payload.id;
      const updatedCustomers = customersCopy.filter(item => item.id != idForDelete);
      return {
        ...state,
        customers: updatedCustomers
      };
    case act.START_EDITING_CUSTOMER:
      const idForEdit = action.payload;
      const customerToEdit = customersCopy.find(item => item.id === idForEdit);
      return {
        ...state,
        customerModalShow: true,
        customerName: customerToEdit.name,
        customerAddress: customerToEdit.address,
        customerPhone: customerToEdit.phone,
        editingCustomer: idForEdit
      };
    case act.FETCH_PUT_CUSTOMERS_SUCCESSFUL:
      console.log(action.payload, '----rcd put customers action.payload');
      const newCustomers = [...customersCopy, action.payload];
      return {
        ...state,
        customers: newCustomers,
        customerName: '',
        customerAddress: '',
        customerPhone: '',
        customerModalShow: false
      };

    default:
      return state;
  }
}
