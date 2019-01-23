import * as act from './actions';
import axios from 'axios';
import getJSON from '../../endpoints';

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

export function actGetCustomers(payload) {
        console.log('start act')
        getJSON().then(result => {
            return {
                type: act.GET_CUSTOMERS,
                payload: result.data
            }
        })

}
/*
export const actGetCustomers = (values) => {
    console.log('start act')
    return async dispatch => {
        try {
            const response = await axios.get('/api/customers');
            dispatch(successHandle(response));
        }
        catch(error) {
            dispatch(errorHandle(error));
        }

        return 'done';
    }
}

/*
async function getJSON(){
    let json = await axios.get('/api/customers');
    return json;
}
*/
