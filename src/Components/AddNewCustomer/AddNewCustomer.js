import React, { Component } from 'react';
import {Button, FormGroup, ControlLabel, FormControl, Form, Modal} from 'react-bootstrap';
import { connect } from 'react-redux'
import {actChangeInputCustomerValue, actChangeInputValue, actCustomerModalShow, actCustomerModalHide, fetchPutCustomers, fetchEditCustomers } from "../../reducers/actions_creators";
import './styles.css'

class AddNewCustomer extends Component {
    state = {
        customerName: '',
        customerAddress: '',
        customerPhone: '',
        startEditing: 0,
    }

    finishEditCustomer = (id) => (event) => {
        console.log("finishEditCustomer")
        event.preventDefault(event);
        const newCustomer = {
            name: this.state.customerName,
            address: this.state.customerAddress,
            phone: this.state.customerPhone
        }

        this.props.fetchEditCustomers({id, newCustomer})
        this.setState({
            customerName:'',
            customerAddress: '',
            customerPhone: '',
            startEditing: 0
        })
    }

    addNewCustomer = () => (event) => {
        event.preventDefault(event);
        const newCustomer = {
            name: this.state.customerName,
            address: this.state.customerAddress,
            phone: this.state.customerPhone
        }
        this.setState({
            customerName:'',
            customerAddress: '',
            customerPhone: ''
        })
        this.props.fetchPutCustomers(newCustomer)
    }

    changeInputCustomerValue = ({target: {value, name}}) => {
        console.log('start action name, value', name, value);
        this.setState({
           [name]: value
        })
    }

    putEditDataInProps() {
            console.log('putingEditDataInProps)' )
        if( this.props.customers.editingCustomer !== 0){
            this.setState({
                customerName: this.props.customers.customerToEdit.name,
                customerAddress: this.props.customers.customerToEdit.address,
                customerPhone: this.props.customers.customerToEdit.phone,
                startEditing: 1
            })
        }
    }


    render() {
        console.log('this.state start', this.state, 'this.props.customers.customerToEdit.name', this.props.customers.customerToEdit.name, 'this.props.customers.editingCustomer', this.props.customers.editingCustomer )
        if(this.props.customers.editingCustomer !== 0 && this.state.startEditing === 0){
            this.putEditDataInProps()
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
                                         onChange={this.changeInputCustomerValue} value={this.state.customerName}
                                         name="customerName"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel className="">Customer Address:</ControlLabel>
                            <FormControl type="text" placeholder={this.props.customers.editingCustomer === 0 ? "Input Customer Address": this.props.customers.customerAddress } className=""
                                         onChange={this.changeInputCustomerValue} value={this.state.customerAddress}
                                          name="customerAddress"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel className="">Customer Phone:</ControlLabel>
                            <FormControl type="phone" placeholder={this.props.customers.editingCustomer === 0 ? "Input Customer Phone": this.props.customers.customerPhone}
                                         onChange={this.changeInputCustomerValue} value={this.state.customerPhone}
                                         name="customerPhone"/>
                        </FormGroup>
                        <div>
                        </div>
                    </Form>
                    <Modal.Footer>
                        <Button bsStyle="info" className="btn" onClick={this.props.actCustomerModalHide}>Cancel</Button>
                        <Button bsStyle="info" className="btn" onClick={this.props.customers.editingCustomer === 0 ? this.addNewCustomer() : this.finishEditCustomer(this.props.customers.editingCustomer)}
                                disabled={this.state.customerName === "" || this.state.customerAddress === ""}>Save Customer</Button>
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
        actChangeInputValue: payload => dispatch(actChangeInputValue(payload)),
        actCustomerModalShow: payload => dispatch(actCustomerModalShow(payload)),
        actCustomerModalHide: payload => dispatch(actCustomerModalHide(payload)),
        fetchPutCustomers: payload => dispatch(fetchPutCustomers(payload)),
        fetchEditCustomers: payload => dispatch(fetchEditCustomers(payload))

    }

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddNewCustomer)

