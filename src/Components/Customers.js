import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  actSetAddNewActive,
  actDeleteCustomer,
  actStartEditingCustomer,
  actCustomerModalShow,
  actGetCustomers
} from './../reducers/actions_creators';

class Customers extends Component {
  deleteCustomer = id => event => {
    event.preventDefault(event);
    this.props.actDeleteCustomer(id)
  };

  startEditCustomer = id => event => {
    event.preventDefault(event);
    this.props.actStartEditingCustomer(id);
  }

  componentDidMount() {
    //this.props.actGetCustomers();
  }

  render() {
    const { customers } = this.props.customers;

    return (
      <div className="">
        <div className="top-line top-line-inv">
          <div className=" title">Customers </div>
          <Button
            className="col-xs-2 pull-right"
            bsStyle="info"
            onClick={this.props.actCustomerModalShow}
          >
            Add New
          </Button>
        </div>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th className="col-xs-1 text-center">#</th>
              <th className="col-xs-1 text-center">Customer</th>
              <th className="col-xs-3 text-center">Address</th>
              <th className="col-xs-2 text-center">Phone</th>
              <th className="col-xs-1 text-center" />
              <th className="col-xs-1 text-center" />
            </tr>
          </thead>
          <tbody>
            {customers.map(item => (
              <tr key={item.id}>
                <td className="text-center">{item.id}</td>
                <td className="text-center">{item.name}</td>
                <td className="text-center">{item.address}</td>
                <td className="text-center">{item.phone}</td>
                <td className="text-center">
                  <Button className="" bsStyle="info" onClick={this.startEditCustomer(item.id)}>
                    Edit
                  </Button>
                </td>
                <td className="text-center">
                  <Button className="" bsStyle="info" onClick={this.deleteCustomer(item.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    customers: store.customers
  };
}

const mapDispatchToProps = dispatch => ({
  actSetAddNewActive: payload => dispatch(actSetAddNewActive(payload)),
  actDeleteCustomer: payload => dispatch(actDeleteCustomer(payload)),
  actStartEditingCustomer: payload => dispatch(actStartEditingCustomer(payload)),
  actCustomerModalShow: payload => dispatch(actCustomerModalShow(payload)),
  actGetCustomers: payload => dispatch(actGetCustomers(payload)),

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Customers);
