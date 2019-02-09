import React, { Component } from 'react';
import { Button, FormGroup, ControlLabel, FormControl, Form, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { actChangeInputCustomerValue, actChangeInputValue, actCustomerModalShow, actCustomerModalHide, fetchPutCustomers, fetchEditCustomers } from "../../reducers/actions_creators";
import './styles.css'

class AddNewCustomer extends Component {
  state = {
    customerName: '',
    customerAddress: '',
    customerPhone: ''
  }


    componentWillReceiveProps(nextProps){
        const {editingCustomer, customerName, customerAddress, customerPhone} = nextProps.customers;
        if (editingCustomer !== 0) {
            this.setState({
                customerName: customerName,
                customerAddress: customerAddress,
                customerPhone: customerPhone,
            });
        }
    }
    /*
    getDerivedStateFromProps(nextProps, prevState){
        console.log('getDerivedStateFromProps', nextProps);
    }
    */

    changeInputCustomerValue = ({target: {value, name}}) => {
        this.setState({
            [name]: value
        });
    };

  finishEditCustomer = (id) => (event) => {
    event.preventDefault(event);
    const newCustomer = {
      name: this.state.customerName,
      address: this.state.customerAddress,
      phone: this.state.customerPhone
    }
    this.setState({
      customerName: '',
      customerAddress: '',
      customerPhone: ''
    })
    this.props.fetchEditCustomers({id, newCustomer})
  };

  addNewCustomer = () => (event) => {
    const {customerName, customerAddress, customerPhone } = this.state;
    event.preventDefault(event);
    const newCustomer = {
      name: customerName,
      address: customerAddress,
      phone: customerPhone
    };
    this.setState({
      customerName: '',
      customerAddress: '',
      customerPhone: ''
    })
    this.props.fetchPutCustomers(newCustomer);
  };



  cancelEditing = () => {
    this.setState({
      customerName: '',
      customerAddress: '',
      customerPhone: ''
    });
    this.props.actCustomerModalHide();
  };


  //  TODO: fix Eslint

    render() {
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
                        <Button bsStyle="info" className="btn" onClick={this.cancelEditing}>Cancel</Button>
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

