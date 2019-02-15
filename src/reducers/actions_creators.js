import * as act from './actions';
import axios from 'axios';
import getJSON from '../../endpoints';
import config from '../config.json';

export  function actAddNewInvoice(payload) {
    return { type: act.ADD_NEW_INVOICE, payload };
}

export  function actChangeInputValue(payload) {
    return { type: act.CHANGE_INPUT_VALUE, payload };
}

export  function actSetAddNewActive(payload) {
    return { type: act.SET_ADDNEW_ACTIVE, payload };
}

export  function actCancelNewInvoices(payload) {
    return { type: act.CANCEL_NEW_INVOICE, payload };
}

export  function actSelectCustomer(payload) {
    return { type: act.SELECT_CUSTOMER, payload };
}

export  function actSelectProduct(payload) {
    return { type: act.SELECT_PRODUCT, payload };
}
export  function actSelectDiscount(payload) {
    return { type: act.SELECT_DISCOUNT, payload };
}
export  function actEditCustomer(payload) {
    return { type: act.EDIT_CUSTOMER, payload };
}
export  function actAddNewCustomer(payload) {
    return { type: act.ADD_NEW_CUSTOMER, payload };
}
export  function actChangeInputCustomerValue(payload) {
    return { type: act.CHANGE_INPUT_CUSTOMER_VALUE, payload };
}

export  function actCustomerModalShow(payload) {
    return { type: act.CUSTOMER_MODAL_SHOW, payload };
}

export  function actCustomerModalHide(payload) {
    return { type: act.CUSTOMER_MODAL_HIDE, payload };
}
export  function actAddNewProduct(payload) {
    return { type: act.ADD_NEW_PRODUCT, payload };
}
export  function actChangeInputProductValue(payload) {
    return { type: act.CHANGE_INPUT_PRODUCT_VALUE, payload };
}

export  function actProductModalShow(payload) {
    return { type: act.PRODUCT_MODAL_SHOW, payload };
}

export  function actProductModalHide(payload) {
    return { type: act.PRODUCT_MODAL_HIDE, payload };
}

export  function actProductQuantity(payload) {
    return { type: act.CHANGE_PRODUCTQUANTITY, payload };
}

export  function actChangeInvoiceItemsValue(payload) {
    return { type: act.CHANGE_INVOICEITEMS_VALUE, payload };
}
export  function actDeleteInvoice(payload) {
    return { type: act.DELETE_INVOICE, payload };
}

export  function actStartEditing(payload) {
  console.log('actStartEditing')
    return { type: act.START_EDITING, payload };
}

export  function actFinishEditing(payload) {
    return { type: act.FINISH_EDITING, payload };
}
export  function actDeleteCustomer(payload) {
    return { type: act.DELETE_CUSTOMER, payload };
}

export  function actStartEditingCustomer(payload) {
    return { type: act.START_EDITING_CUSTOMER, payload };
}

export  function actFinishEditingCustomer(payload) {
    return { type: act.FINISH_EDITING_CUSTOMER, payload };
}
export  function actDeleteProduct(payload) {
    return { type: act.DELETE_PRODUCT, payload };
}

export  function actStartEditingProduct(payload) {
    return { type: act.START_EDITING_PRODUCT, payload };
}

export  function actFinishEditingProduct(payload) {
    return { type: act.FINISH_EDITING_PRODUCT, payload };
}

/*CUSTOMER BLOCK*/

export function fetchCustomersSuccessful(payload) {
    return { type: act.FETCH_CUSTOMERS_SUCCESSFUL, payload}
}

export const fetchCustomers = () => {
    return (dispatch) => {
        return axios.get(`${config.SERVER_URI}/customers`)
          .then(response => {
            if (response && response.data && response.status === 200) {
              dispatch(fetchCustomersSuccessful(response.data))
            }
          })
          .catch(error => {
              throw(error);
          });
    };
};

export function fetchDeleteCustomersSuccessful(data) {
  const {id} = data;
  return { type: act.FETCH_DELETE_CUSTOMERS_SUCCESSFUL, payload: {id}}
}

export const fetchDeleteCustomers = (id) => {
  return (dispatch) => {
    return axios.delete(`${config.SERVER_URI}/customers/${id}`)
      .then(response => {
        if (response && response.data && response.status === 200) {
          dispatch(fetchDeleteCustomersSuccessful(response.data))
        }
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function fetchPutCustomersSuccessful(data) {
   return { type: act.FETCH_PUT_CUSTOMERS_SUCCESSFUL, payload: {id: data.id, name: data.name, address: data.address, phone: data.phone}}
}

export const fetchPutCustomers = ({ id, name, address, phone }) => {
  return (dispatch) => {
    return axios.post(`${config.SERVER_URI}/customers`, {id, name, address, phone} )
      .then(response => {
        if (response && response.data && response.status === 200) {
          dispatch(fetchPutCustomersSuccessful(response.data))
        }
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function fetchEditCustomersSuccessful(data) {
   return { type: act.FETCH_EDIT_CUSTOMERS_SUCCESSFUL, payload: data}
}

export const fetchEditCustomers = (payload) => {
   const {name, address, phone} = payload.newCustomer;
  return (dispatch) => {
    return axios.put(`${config.SERVER_URI}/customers/${payload.id}`, { name, address, phone } )
      .then(response => {
        if (response && response.data && response.status === 200) {
           dispatch(fetchEditCustomersSuccessful(response.data))
        }
      })
      .catch(error => {
        throw(error);
      });
  };
};

/*PRODUCTS BLOCK*/

export function fetchProductsSuccessful(payload) {
    return { type: act.FETCH_PRODUCTS_SUCCESSFUL, payload}
}

export const fetchProducts = () => {
  return (dispatch) => {
    return axios.get(`${config.SERVER_URI}/products`)
      .then(response => {
        dispatch(fetchProductsSuccessful(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function fetchDeleteProductsSuccessful(data) {
  const {id} = data;
  return { type: act.FETCH_DELETE_PRODUCTS_SUCCESSFUL, payload: {id}}
}

export const fetchDeleteProducts = (id) => {
  return (dispatch) => {
    return axios.delete(`${config.SERVER_URI}/products/${id}`)
      .then(response => {
        dispatch(fetchDeleteProductsSuccessful(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function fetchPutProductsSuccessful(data) {
  console.log('fetchPutProductsSuccessful(data)', data)
  return { type: act.FETCH_PUT_PRODUCTS_SUCCESSFUL, payload: {id: data.id, name: data.name, price: data.price}}
}

export const fetchPutProducts = ({ name, price }) => {
  return (dispatch) => {
    return axios.post(`${config.SERVER_URI}/products`, {name, price} )
      .then(response => {
        dispatch(fetchPutProductsSuccessful(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function fetchEditProductsSuccessful(data) {
  console.log("FETCH_EDIT_PRODUCTS_SUCCESSFUL(data)", data)
  return { type: act.FETCH_EDIT_PRODUCTS_SUCCESSFUL, payload: data}
}

export const fetchEditProducts = (payload) => {
  console.log('start fetchEditProducts in actions id, Products', payload.id, payload.product);
  const {name, price} = payload.product;
  return (dispatch) => {
    return axios.put(`${config.SERVER_URI}/products/${payload.id}`, { name, price } )
      .then(response => {
        console.log('-----fetchEDITproducts response', response.data);
        dispatch(fetchEditProductsSuccessful(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

/*INVOICE BLOCK*/
export function fetchInvoicesSuccessful(payload) {
  return { type: act.FETCH_INVOICES_SUCCESSFUL, payload}
}

export const fetchInvoices = () => {
  return (dispatch) => {
    return axios.get(`${config.SERVER_URI}/invoices`)
      .then(response => {
        console.log('-----', response);
        dispatch(fetchInvoicesSuccessful(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function fetchOneInvoiceSuccessful(payload) {
  return { type: act.FETCH_ONE_INVOICE_SUCCESSFUL, payload}
}

export const fetchOneInvoice = (id) => {
  return (dispatch) => {
    return axios.get(`${config.SERVER_URI}/invoices/${id}`)
      .then(response => {
        console.log('-----', response);
        dispatch(fetchOneInvoiceSuccessful(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function fetchDeleteInvoicesSuccessful(data) {
  const {id} = data;
  return { type: act.FETCH_DELETE_INVOICES_SUCCESSFUL, payload: {id}}
}

export const fetchDeleteInvoices = (id) => {
  return (dispatch) => {
    return axios.delete(`${config.SERVER_URI}/invoices/${id}`)
      .then(response => {
        if (response && response.data && response.status === 200) {
          dispatch(fetchDeleteInvoicesSuccessful(response.data))
        }
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function fetchPutInvoicesSuccessful(data) {
  return { type: act.FETCH_PUT_INVOICES_SUCCESSFUL, payload: {id: data.id, customer_id: data.customer_id, discount: data.discount, total: data.total}}
}

export const fetchPutInvoices = ({ newCustomer, newDiscount, total }) => {
  console.log('fetchPutInvoices')
  return (dispatch) => {
    return axios.post(`${config.SERVER_URI}/invoices`, {customer_id: newCustomer, discount: newDiscount, total: total} )
      .then(response => {
        if (response && response.data && response.status === 200) {
          dispatch(fetchPutInvoicesSuccessful(response.data))
        }
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function fetchEditInvoicesSuccessful(data) {
  return { type: act.FETCH_EDIT_INVOICES_SUCCESSFUL, payload: data}
}

export const fetchEditInvoices = ({ newCustomer, newDiscount, total, id }) => {
  console.log('fetchEditInvoices',  newCustomer, newDiscount, total, id );
  return (dispatch) => {
    return axios.put(`${config.SERVER_URI}/invoices/${id}`, { customer_id: newCustomer, discount: newDiscount, total } )
      .then(response => {
        if (response && response.data && response.status === 200) {
          dispatch(fetchEditInvoicesSuccessful(response.data))
        }
      })
      .catch(error => {
        throw(error);
      });
  };
};

/*INVOICE DETAILS BLOCK*/
export function fetchInvoiceDetailsSuccessful(items, id) {
  console.log('fetchInvoiceDetails id ')
  return { type: act.FETCH_INVOICEDETAILS_SUCCESSFUL, payload: {items, id}}
}

export const fetchInvoiceDetails = (id) => {
  console.log('fetchInvoiceDetails id', id)
  return (dispatch) => {
    return axios.get(`${config.SERVER_URI}/invoices/${id}/items`)
      .then(response => {
        console.log('-----', response);
        dispatch(fetchInvoiceDetailsSuccessful(response.data, id))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function fetchDeleteInvoiceDetailsSuccessful(data) {
  const {id} = data;
  return { type: act.FETCH_DELETE_INVOICEDETAILS_SUCCESSFUL, payload: {id}}
}

export const fetchDeleteInvoiceDetails = (payload) => {
  console.log('fetchDeleteInvoiceDetails', payload)
  return (dispatch) => {
    return axios.delete(`${config.SERVER_URI}/invoices/${payload.id}/items/${payload.item.id}`)
      .then(response => {
        if (response && response.data && response.status === 200) {
          dispatch(fetchDeleteInvoiceDetailsSuccessful(response.data))
        }
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function fetchPutInvoiceDetailsSuccessful(data) {
  return { type: act.FETCH_PUT_INVOICEDETAILS_SUCCESSFUL, payload: {id: data.id, product_id: data.product_id, quantity: data.quantity}}
}

export const fetchPutInvoiceDetails = ({ id, item }) => {
  console.log('fetchPutInvoiceDetails')
  return (dispatch) => {
    return axios.post(`${config.SERVER_URI}/invoices/${id}/items`, {product_id: item.name, quantity: item.quantity} )
      .then(response => {
        if (response && response.data && response.status === 200) {
          dispatch(fetchPutInvoiceDetailsSuccessful(response.data))
        }
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function fetchEditInvoiceDetailsSuccessful(data) {
  console.log('fetchEditInvoiceDetailsSuccessful(data)', data)
  return { type: act.FETCH_EDIT_INVOICEDETAILS_SUCCESSFUL, payload: data}
}

export const fetchEditInvoiceDetails = (payload) => {
  console.log('fetchEditInvoiceDetails = (id, item)', payload);
  return (dispatch) => {
    return axios.put(`${config.SERVER_URI}/invoices/${payload.id}/items/${payload.item.id}`, { product_id: payload.item.name, quantity: payload.item.quantity } )
      .then(response => {
        if (response && response.data && response.status === 200) {
          dispatch(fetchEditInvoiceDetailsSuccessful(response.data))
        }
      })
      .catch(error => {
        throw(error);
      });
  };
};


