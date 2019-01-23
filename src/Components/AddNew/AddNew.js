import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux'
import {
  actAddNewInvoice,
  actChangeInputValue,
  actCancelNewInvoices,
  actSelectProduct,
  actProductQuantity,
  actChangeInvoiceItemsValue,
  actFinishEditing,
 } from '../../reducers/actions_creators.js';
import './styles.css'


class AddNew extends Component {
  finishEditInvoice = (id, productsInInvoice, newTotal) => (event) => {
    event.preventDefault(event);
    this.props.actFinishEditing(id, productsInInvoice, newTotal)
  }

  changeInputValue = (event) => {
    event.preventDefault(event);
    const { name, value } = event.target;
    this.props.actChangeInputValue({name, value })
  }

  addNewInvoice = (productsInInvoice, id, total) => (event) => {
    event.preventDefault(event);
    console.log('total in addnew', total)
    this.props.actAddNewInvoice({productsInInvoice, id, total })
  }
  selectProduct = (products, productsInInvoice, newProduct) => (event) => {
    event.preventDefault(event);
    this.props.actSelectProduct({ products, productsInInvoice, newProduct });
  }
  changeProductQuantity = (productsInInvoice) => (event) => {
    event.preventDefault(event);
    const {target} = event;
    this.props.actProductQuantity({productsInInvoice: productsInInvoice, name: target.name, value: target.value })
  }

  changeInvoiceDetailsValue = (products) => (event) => {
    event.preventDefault(event);
    const { target } = event;
    this.props.actChangeInvoiceItemsValue({products: products, name: target.name, value: target.value })
  };

  render() {
    const { customers } = this.props.customers;
    const { products } = this.props.products;
    const productsInInvoice = this.props.invoiceItems.invoiceItems || [];
    const discount = this.props.invoices.newDiscount != 0 ? (100 - this.props.invoices.newDiscount) / 100 : 1;
    const { newProduct } = this.props.invoiceItems;
    const newTotal = (this.props.invoices.newSubTotal * discount).toFixed(2);

    return (
      <div className="addNew">
        <div className='form-group'>
          <label htmlFor='customer_id' className='form-label'>Customer</label>
          <select className='form-control form-select'
            id='customer_id'
            value={this.props.invoices.newCustomer}
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
            value={this.props.invoiceItems.newProduct}
            onChange={this.changeInvoiceDetailsValue(products)}
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
          <Button bsStyle="info" className="btn" onClick={this.selectProduct(products, productsInInvoice, newProduct)}
            disabled={this.props.invoiceItems.newProduct === ''}>Add Product</Button>
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
                               onChange={this.changeProductQuantity(productsInInvoice)}
                               value={item.quantity} name={item.name}/>
                      </td>
                      <th className="col-xs-1 text-center">{item.quantity * item.price}</th>
                    </tr>
                ))}
                </tbody>
              </Table>
             <hr/>j
              < div className="invoice-total">
                <div className="total-title">Subtotal: <span
                    className="total-sum">{this.props.invoices.newSubTotal}</span></div>
                <div className="discount-block">
                  <label htmlFor="discount-input" className="text-left">Discount:</label>
                  <input className="discount-input" type="number" placeholder={this.props.invoices.newDiscount}
                         onChange={this.changeInputValue}
                         value={this.props.invoices.newDiscount} name="newDiscount"/>
                </div>
                <hr/>
                <div className="total-title">Total: <span
                    className="total-sum">{newTotal}</span></div>
                <div className="add-btns">
                  <Button bsStyle="info" className="btn btn-cancel"
                          onClick={this.props.actCancelNewInvoices}>Cancel</Button>
                  <Button bsStyle="info" className="btn"
                          onClick={this.props.invoices.editingInvoice != 0 ? this.finishEditInvoice({id: this.props.invoices.editingInvoice, productsInInvoice, total: newTotal}) : this.addNewInvoice(productsInInvoice, this.props.invoices.newInvoiceId, newTotal )}
                          disabled={this.props.invoices.newCustomer === "" || productsInInvoice.length < 1}>Save Invoice</Button>
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
    actAddNewInvoice: payload => dispatch(actAddNewInvoice(payload)),
    actCancelNewInvoices: payload => dispatch(actCancelNewInvoices(payload)),
    actChangeInputValue: payload => dispatch(actChangeInputValue(payload)),
    actSelectProduct: payload => dispatch(actSelectProduct(payload)),
    actProductQuantity: payload => dispatch(actProductQuantity(payload)),
    actChangeInvoiceItemsValue: payload => dispatch(actChangeInvoiceItemsValue(payload)),
    actFinishEditing: payload => dispatch(actFinishEditing(payload)),
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNew)
