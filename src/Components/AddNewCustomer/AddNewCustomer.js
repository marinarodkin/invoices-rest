import React, { Component } from 'react';
import {Button, FormGroup, ControlLabel, FormControl, Form, Modal} from 'react-bootstrap';
import { connect } from 'react-redux'
import {actChangeInputCustomerValue, actChangeInputValue, actAddNewCustomer, actCustomerModalShow, actCustomerModalHide, actFinishEditingCustomer, fetchPutCustomers, fetchEditCustomers } from "../../reducers/actions_creators";
import './styles.css'

class AddNewCustomer extends Component {
    finishEditCustomer = (id, customer) => (event) => {
        event.preventDefault(event);
        this.props.fetchEditCustomers({id, customer})
    }
    addNewCustomer = (customer) => (event) => {
        event.preventDefault(event);
        this.props.fetchPutCustomers(customer)
    }

    render() {
        const newCustomer = {
            id: 5,
            name: this.props.customers.customerName,
            address: this.props.customers.customerAddress,
            phone: this.props.customers.customerPhone
        }
        return (
            <div className="static-modal add-customer-modal">
                <Modal show={this.props.customers.customerModalShow} onHide={this.props.actCustomerModalHide}>
                    <Modal.Header>
                        <Modal.Title>Add New Customer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    </Modal.Body>
                    <Form className="add-form">
                        <FormGroup>
                            <ControlLabel className="">Customer Name:</ControlLabel>
                            <FormControl type="text" placeholder={this.props.customers.editingCustomer === 0 ? "Input Customer Name": this.props.customers.customerName } className=""
                                         onBlur={this.props.actChangeInputCustomerValue}
                                         name="customerName"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel className="">Customer Address:</ControlLabel>
                            <FormControl type="text" placeholder={this.props.customers.editingCustomer === 0 ? "Input Customer Address": this.props.customers.customerAddress } className=""
                                         onBlur={this.props.actChangeInputCustomerValue}
                                          name="customerAddress"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel className="">Customer Phone:</ControlLabel>
                            <FormControl type="phone" placeholder={this.props.customers.editingCustomer === 0 ? "Input Customer Phone": this.props.customers.customerPhone}
                                         onBlur={this.props.actChangeInputCustomerValue}
                                         name="customerPhone"/>
                        </FormGroup>
                        <div>
                        </div>
                    </Form>
                    <Modal.Footer>
                        <Button bsStyle="info" className="btn" onClick={this.props.actCustomerModalHide}>Cancel</Button>
                        <Button bsStyle="info" className="btn" onClick={this.props.customers.editingCustomer === 0 ? this.addNewCustomer(newCustomer) : this.finishEditCustomer(this.props.customers.editingCustomer, newCustomer)}
                                disabled={this.props.customers.customerName === "" || this.props.customers.customerAddress === "" || this.props.customers.customerPhone === ""}>Save Customer</Button>
                    </Modal.Footer>
                </Modal>
            </div>



    );
  }
}

const mapStateToProps = store => {
  return {
     customers: store.customers,
  }
}

const mapDispatchToProps = dispatch => {
    return {
        actChangeInputCustomerValue: payload => dispatch(actChangeInputCustomerValue(payload)),
        actAddNewCustomer: payload => dispatch(actAddNewCustomer(payload)),
        actChangeInputValue: payload => dispatch(actChangeInputValue(payload)),
        actCustomerModalShow: payload => dispatch(actCustomerModalShow(payload)),
        actCustomerModalHide: payload => dispatch(actCustomerModalHide(payload)),
        actFinishEditingCustomer: payload => dispatch(actFinishEditingCustomer(payload)),
        fetchPutCustomers: payload => dispatch(fetchPutCustomers(payload)),
        fetchEditCustomers: payload => dispatch(fetchEditCustomers(payload))

    }

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddNewCustomer)
/*
<FormControl type="text" placeholder="Input Customer Name" className=""
onChange={this.props.actChangeInputCustomerValue}
value={this.props.customers.customerName} name="customerName"/>
*/
