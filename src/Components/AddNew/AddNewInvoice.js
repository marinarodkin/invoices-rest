import React, { Component } from 'react';
import { Button, FormGroup, ControlLabel, FormControl, Form, Modal} from 'react-bootstrap';
import { connect } from 'react-redux'
import {
    actChangeInputValue,
    actAddNewInvoice,
    actInvoiceModalShow,
    actInvoiceModalHide,
    fetchEditInvoices,
    fetchPutInvoices,
    actCancelNewInvoices
} from "../../reducers/actions_creators";
import './styles.css'

class AddNewInvoice extends Component {

    state = {
        invoiceId: '',
        customer: '',
        product: '',
        days: '',
        deposit: '',
        payment: ''
    };

    finishEditProduct = (id, product) => (event) => {
        console.log('finishEditProduct product', product)
        event.preventDefault(event);
        this.props.fetchEditProducts({id, product})
    }


    changeInputValue = ({ target: { value, name } }) => {
        const reg = /^\d+$/;
        if (name === 'newDiscount' && (value > 100 || value < 0 || !value.match(reg))) {
            return;
        }
        this.setState({
            [name]: value,
        });
    };

    addNewInvoice = () => (event) => {
        const { invoiceId, customer, product, days, deposit, payment } = this.state;
        event.preventDefault(event);
        const newInvoice = {
            id: invoiceId,
            customer,
            product,
            days,
            deposit,
            payment
        };
        this.setState({
            invoiceId: '',
            customer: '',
            product: '',
            days: '',
            deposit: '',
            payment: ''
        });
        this.props.fetchPutInvoices(newInvoice);
    };

    cancelEditing = () => {
        this.setState({
            invoiceId: '',
            customer: '',
            product: '',
            days: '',
            deposit: '',
            payment: ''
        });
        this.props.actInvoiceModalHide();
    };

    render() {
        const { customers } = this.props.customers;
        const { products } = this.props.products;

        return (
            <div className="static-modal add-innoice-modal">
                <Modal show={this.props.invoices.invoiceModalShow} onHide={this.props.actInvoiceModalHide}>
                    <Modal.Header>
                        <Modal.Title>Добавить новый заказ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className='form-group'>
                            <label htmlFor='customer_id' className='form-label col-xs-4'>Клиент</label>
                            <select className='form-control form-select col-xs-8'
                                    id='customer_id'
                                    value={this.state.newCustomer}
                                    onChange={this.changeInputValue}
                                    name="newCustomer"
                            >
                                <option hidden={true} value= ''>
                                    Выбрать клиента
                                </option>
                                {customers.map(customer =>
                                    <option key={customer.id} value={customer.name}>
                                        {customer.name}
                                    </option>
                                )})}
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='product_id' className='form-label col-xs-4'>Инструмент</label>
                            <select className='form-control form-select col-xs-8' id='product_id'
                                    value={this.state.newProduct}
                                    onChange={this.changeInputValue}
                                    name="newProduct"
                            >
                                <option hidden={false} value = '' >
                                    Выбрать Инструмент
                                </option>
                                {products.map(product =>
                                    <option key={product.id} value={product.name}>
                                        {product.name}
                                    </option>
                                )})}
                            </select>

                        </div>
                        <FormGroup>
                            <ControlLabel className="col-xs-4">Количество дней</ControlLabel>
                            <FormControl type="text" placeholder="Количество дней" className="col-xs-8"
                                         onChange={this.props.actChangeInputProductValue}
                                         value={this.props.products.productPayment} name="amountDays"/>
                        </FormGroup>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="info" className="btn" onClick={this.cancelEditing}>Отменить</Button>
                    <Button bsStyle="info" className="btn"
                            onClick={this.props.customers.editingCustomer === 0 ? this.addNewInvoice() : this.finishEditCustomer(this.props.invoices.editingInvoice)}
                            disabled={this.state.customer === '' || this.state.product === ''}>Сохранить</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = store => {
  return {
      customers: store.customers,
      products: store.products,
      invoices: store.invoices,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      actInvoiceModalShow: payload => dispatch(actInvoiceModalShow(payload)),
      actInvoiceModalHide: payload => dispatch(actInvoiceModalHide(payload)),
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


