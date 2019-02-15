import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux'
import {
  actChangeInputValue,
  actCancelNewInvoices,
  fetchPutInvoices,
  fetchPutInvoiceDetails,
  fetchEditInvoices,
  fetchEditInvoiceDetails,
  fetchDeleteInvoiceDetails
 } from '../../reducers/actions_creators.js';
import './styles.css'
import { getItemPrice, getCustomerId } from '../../functions';
import { fetchPutCustomers } from '../../reducers/actions_creators';

class AddNewInvoice extends Component {
  state = {
    newCustomer: '',
    newDiscount: 0,
    newTotal: 0,
    newSubTotal: 0,
    newItem: {},
    invoiceDetails: [],
    newProduct: {},
    editingInvoice: 0,
    prevInvoiceDetails: []
  };

  componentWillReceiveProps(nextProps) {
    const { invoiceDetails, editInvoiceId } = nextProps.invoiceItems;
    const prevInvoiceDetails = [...invoiceDetails];
    if (editInvoiceId !== 0) {
      const mapInvoiceDetails = invoiceDetails.map(item => {
        return {
          name: item.product_id,
          quantity: item.quantity,
          price: getItemPrice(item.product_id, this.props.products.products),
          id: item.id,
        }
      });
      this.setState({
        invoiceDetails: mapInvoiceDetails,
        prevInvoiceDetails,

      });
      console.log('nextProps invoices', nextProps.invoices)
      const { newCustomer, newDiscount, editingInvoice } = nextProps.invoices;
      if (editingInvoice !== 0) {

        this.setState({
          newCustomer,
          newDiscount,
          editingInvoice
        });
      }
    }
  }

  changeInputValue = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  changeInvoiceDetailsValue = (e) => {
    const { value, name} = e.target;
    const price = getItemPrice(value, this.props.products.products);
    this.setState(prevState => ({...prevState, newItem: { [name]: value, price: price}, newProduct: value }));
  }

  selectProduct = () => {
    console.log("!selectProduct");
    const stateCopy = {...this.state};
    const { newProduct, invoiceDetails } = stateCopy;
    let countNewSubTotal = 0;
    console.log("newProduct", newProduct);
    const itemToChange = invoiceDetails.find(item => item.name === newProduct); // checking if this item is already in products table
    if (itemToChange) {
      // when this item is already in table
      itemToChange.quantity = itemToChange.quantity * 1  + 1;
      countNewSubTotal = (invoiceDetails.reduce((sum, item) => {
        return sum + item.price * item.quantity }, 0)).toFixed(2);
      this.setState(prevState => ({...prevState, invoiceDetails: invoiceDetails, newProductTotal: 0, newSubTotal: countNewSubTotal }));
    } else {
      // when this item is the first time selected
      const newInvoiceItem = {
        name: newProduct,
        quantity: 1,
        price: getItemPrice(newProduct, this.props.products.products)
      }
      const newInvoiceItems = [...invoiceDetails, newInvoiceItem];
      countNewSubTotal = (newInvoiceItems.reduce((sum, item) => {
        return sum + item.price * item.quantity }, 0)).toFixed(2);

      this.setState(prevState => ({...prevState, invoiceDetails: newInvoiceItems, newProductTotal: 0, newSubTotal: countNewSubTotal }));
    }
  }

  changeProductQuantity = (event) => {
    event.preventDefault(event);
    const {name, value} = event.target;
    const stateCopy = {...this.state};
    const { invoiceDetails } = stateCopy;
    const productToChange = invoiceDetails.find(item => item.name === name);
    productToChange.quantity = value;
    productToChange.total = value * productToChange.price;
    const countNewSubTotal = (invoiceDetails.reduce((sum, item) => {
      return sum + item.price * item.quantity }, 0)).toFixed(2);
    this.setState(prevState => ({...prevState, invoiceDetails: invoiceDetails, newSubTotal: countNewSubTotal}));
  }

  deleteItem = (name) => (event) => {
    event.preventDefault(event);
    this.setState(prevState => ({...prevState, invoiceDetails: prevState.invoiceDetails.filter(item => item.name !== name)}));
  }

  finishEditInvoice = (total) => (event) => {
    event.preventDefault(event);
    const {newCustomer, newDiscount, editingInvoice} = this.state;
    this.props.fetchEditInvoices({newCustomer, newDiscount, total, id: editingInvoice});
    const { invoiceDetails, prevInvoiceDetails } = this.state;
    const id = editingInvoice;
    invoiceDetails.forEach(item => {
      if (prevInvoiceDetails.findIndex(elem => elem.product_id === item.name) === -1){
        this.props.fetchPutInvoiceDetails({id, item })
      } else {
        this.props.fetchEditInvoiceDetails({ id, item })
      }
    } )
    prevInvoiceDetails.forEach(item => {
      if (invoiceDetails.findIndex(elem => elem.name === item.product_id) === -1){
        this.props.fetchDeleteInvoiceDetails({ id, item })
      }
      }
    )



    //this.props.actFinishEditing(id, productsInInvoice, newTotal)
  }

  addNewInvoice = (productsInInvoice, total) => (event) => {
    event.preventDefault(event);
    const {newCustomer, newDiscount} = this.state;
    this.props.fetchPutInvoices({newCustomer, newDiscount, total  });
    const {invoices} = this.props.invoices;
    const lastInvoice = invoices[invoices.length - 1];
    const id = lastInvoice.id + 1;
    productsInInvoice.forEach(item =>
      this.props.fetchPutInvoiceDetails({id, item }) )
    this.setState(prevState => ({...prevState}));
  }

  //TODO: округление в тотал деталей


  render() {
    console.log('render AddInv props!!!', this.props.invoices, this.props.invoiceItems, 'state', this.state );
    const { customers } = this.props.customers;
    const { products } = this.props.products;
    const productsInInvoice = this.state.invoiceDetails || [];
    const discount = this.state.newDiscount != 0 ? (100 - this.state.newDiscount) / 100 : 1;
    const { newProduct } = this.props.invoiceItems;
    const newTotal = (this.state.newSubTotal * discount).toFixed(2);

    return (
      <div className="addNew">
        <div className='form-group'>
          <label htmlFor='customer_id' className='form-label'>Customer</label>
          <select className='form-control form-select'
            id='customer_id'
            value={this.state.newCustomer}
            onChange={this.changeInputValue}
            name="newCustomer"
          >
            <option hidden={true} value= ''>
              Select customer
            </option>
            {customers.map(customer =>
              <option key={customer.id} value={customer.name}>
                {customer.name}
              </option>
            )})}
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='product_id' className='form-label'>Product</label>
          <select className='form-control form-select' id='product_id'
            value={this.state.newProduct}
            onChange={this.changeInvoiceDetailsValue}
            name="newProduct"
          >
            <option hidden={true} value={''}>
              Select product
            </option>
            {products.map(product =>
                <option key={product.id} value={product.name}>
                {product.name}
              </option>
            )})}
          </select>
          <Button bsStyle="info" className="btn" onClick={this.selectProduct}
            disabled={this.state.newProduct === ''}>Add Product</Button>
        </div>
        {productsInInvoice.length < 1 ?
            (< div className="cancel-total col-md-offset-10 col-md-2 text-right">
              <hr/>
              <Button bsStyle="info" className="btn" onClick={this.props.actCancelNewInvoices}>Cancel</Button>
            </div>)
            :
            <div className="invoice-items-table">
              <Table striped condensed hover>
                <thead>
                <tr>
                  <th className="col-xs-1 text-center">#</th>
                  <th className="col-xs-4">Product</th>
                  <th className="col-xs-1 text-center">Price</th>
                  <th className="col-xs-1 text-center">Quantity</th>
                  <th className="col-xs-1 text-center">Total</th>
                  <th className="col-xs-1 text-center"></th>
                </tr>
                </thead>
                <tbody>
                {productsInInvoice.map((item, index) => (
                    <tr key={`p-${item.name}`}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{item.name}</td>
                      <td className="text-center">{item.price}</td>
                      <td className="text-center">
                        <input className="quantity-input" type="number" placeholder="0"
                               onChange={this.changeProductQuantity}
                               value={item.quantity} name={item.name}/>
                      </td>
                      <th className="col-xs-1 text-center">{item.quantity * item.price}</th>
                      <td className="text-center">
                        <Button className="" bsStyle="info" onClick={this.deleteItem(item.name)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                ))}
                </tbody>
              </Table>
             <hr/>j
              < div className="invoice-total">
                <div className="total-title">Subtotal: <span
                    className="total-sum">{this.state.newSubTotal}</span></div>
                <div className="discount-block">
                  <label htmlFor="discount-input" className="text-left">Discount:</label>
                  <input className="discount-input" type="number" placeholder={this.state.newDiscount}
                         onChange={this.changeInputValue}
                         value={this.state.newDiscount} name="newDiscount"/>
                </div>
                <hr/>
                <div className="total-title">Total: <span
                    className="total-sum">{newTotal}</span></div>
                <div className="add-btns">
                  <Button bsStyle="info" className="btn btn-cancel"
                          onClick={this.props.actCancelNewInvoices}>Cancel</Button>
                  <Button bsStyle="info" className="btn"
                          onClick={this.state.editingInvoice != 0 ? this.finishEditInvoice(newTotal) : this.addNewInvoice(productsInInvoice, newTotal )}
                          disabled={this.state.newCustomer === "" || productsInInvoice.length < 1}>Save Invoice</Button>
                </div>
              </div>
            </div>
        }
        <hr/>
      </div>
    );
  }
}


const mapStateToProps = store => {
  return {
    customers: store.customers,
    products: store.products,
    invoices: store.invoices,
    invoiceItems: store.invoiceItems
  };
}

const mapDispatchToProps = dispatch => {
  return {
    actCancelNewInvoices: payload => dispatch(actCancelNewInvoices(payload)),
    actChangeInputValue: payload => dispatch(actChangeInputValue(payload)),

    fetchPutInvoices: payload => dispatch(fetchPutInvoices(payload)),
    fetchPutInvoiceDetails: payload => dispatch(fetchPutInvoiceDetails(payload)),
    fetchEditInvoices: payload => dispatch(fetchEditInvoices(payload)),
    fetchEditInvoiceDetails: payload => dispatch(fetchEditInvoiceDetails(payload)),
    fetchDeleteInvoiceDetails: payload => dispatch(fetchDeleteInvoiceDetails(payload)),
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewInvoice)
