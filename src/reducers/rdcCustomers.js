import * as act from './actions'; // CONSTANTS FROM ACTIONS

import { getCustomerId } from '../functions';

const customerState = {
  /* customers */
  customers: [
    {
      id: 111,
      name: 'Mark Benson',
      address: '353 Rochester St, Rialto FL 43250',
      phone: '555-534-2342'
    },
    {
      id: 112,
      name: 'Bob Smith',
      address: '215 Market St, Dansville CA 94',
      phone: '555-534-2177'
    },
    {
      id: 113,
      name: 'John Draper',
      address: '890 Main St, Fontana IL 31450',
      phone: '555-534-1111'
    },
    {
      id: 117,
      name: 'Mary Jane',
      address: '555 Vallei St, Rialto FL 43250',
      phone: '555-534-2342'
    },
    {
      id: 118,
      name: 'Freddy Black',
      address: '777 Dorton St, Dansville CA 94',
      phone: '555-534-2177'
    },
    {
      id: 119,
      name: 'Harry Simus ',
      address: '558 Lowpi St, Fontana IL 31450',
      phone: '555-534-1111'
    }
  ],
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
    case act.CHANGE_INPUT_CUSTOMER_VALUE:
      const { value = '', name = '' } = action.payload ? action.payload.target : {};
      return { ...state, [name]: value };
    case act.ADD_NEW_CUSTOMER:
      const newCustomer = {
        id: getCustomerId(),
        name: customerName,
        address: customerAddress,
        phone: customerPhone
      };
      const newCustomers = [...customersCopy, newCustomer];
      return {
        ...state,
        customers: newCustomers,
        customerName: '',
        customerAddress: '',
        customerPhone: '',
        customerModalShow: false
      };
    case act.CUSTOMER_MODAL_SHOW:
      return { ...state, customerModalShow: true };
    case act.CUSTOMER_MODAL_HIDE:
      return { ...state, customerModalShow: false };
    case act.DELETE_CUSTOMER:
      const idForDelete = action.payload;
      const updatedCustomers = customersCopy.filter(item => item.id != idForDelete);
      return { ...state, customers: updatedCustomers };
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
    case act.FINISH_EDITING_CUSTOMER:
      const editingCustomer = action.payload;
      const toEditCustomer = customersCopy.find(item => item.id === editingCustomer);
      toEditCustomer.name = state.customerName;
      toEditCustomer.address = state.customerAddress;
      toEditCustomer.phone = state.customerPhone;
      return {
        ...state,
        customers: customersCopy,
        customerModalShow: false,
        customerName: '',
        customerAddress: '',
        customerPhone: '',
        editingCustomer: 0
      };
    case act.GET_CUSTOMERS:
      console.log('action.payload1', action.payload);

      return { ...state, customerArr: action.payload };
    default:
      return state;
  }
}
