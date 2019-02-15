import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux'
import {
  actSetAddNewActive,
  actStartEditing,
  fetchInvoices, fetchDeleteInvoices, fetchInvoiceDetails, fetchOneInvoice,
  fetchCustomers,
  fetchProducts,
} from './../reducers/actions_creators';
import AddNewInvoice from './AddNew/AddNewInvoice';

class Invoices extends Component {

  componentDidMount() {
    this.props.fetchInvoices();
    this.props.fetchCustomers();
    this.props.fetchProducts();
  }

  deleteInvoice = id => event => {
    event.preventDefault(event);
    this.props.fetchDeleteInvoices(id)
  };

  startEditInvoice = id => event => {
    event.preventDefault(event);
    this.props.fetchInvoiceDetails(id);
    this.props.actStartEditing({ id });
  };

  render() {
    const { invoices, isAddingInvoice } = this.props.invoices;
    const { actSetAddNewActive } = this.props;
    return (
      <div className="" style={{ marginTop: '20px' }}>
        <div className="top-line top-line-inv">
          <div className=" title">Invoices </div>
          {isAddingInvoice ? null : <Button className="col-xs-2" bsStyle="info" onClick={actSetAddNewActive}  >Add New</Button> }
        </div>
        {isAddingInvoice ? <AddNewInvoice /> : null}
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th className="col-xs-2 text-center">#</th>
              <th className="col-xs-6 text-center">Customer</th>
              <th className="col-xs-1 text-center">Discount</th>
              <th className="col-xs-1 text-center">Total</th>
              <th className="col-xs-1 text-center" />
              <th className="col-xs-1 text-center" />
            </tr>
          </thead>
          <tbody>
            {invoices.map(item => (
              <tr key={item.id}>
                <td className="text-center">{item.id}</td>
                <td className="text-center">{item.customer_id}</td>
                <td className="text-center">{item.discount}%</td>
                <td className="text-center">${item.total}</td>
                <td className="text-center">
                  <Button className="" bsStyle="info" onClick={this.startEditInvoice(item.id)}>
                    Edit
                  </Button>
                </td>
                <td className="text-center">
                  <Button className="" bsStyle="info" onClick={this.deleteInvoice(item.id)}>
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
    invoices: store.invoices,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    actSetAddNewActive: payload => dispatch(actSetAddNewActive(payload)),
    actStartEditing: payload => dispatch(actStartEditing(payload)),
    fetchInvoices: payload => dispatch(fetchInvoices(payload)),
    fetchDeleteInvoices: payload => dispatch(fetchDeleteInvoices(payload)),
    fetchInvoiceDetails: payload => dispatch(fetchInvoiceDetails(payload)),
    fetchCustomers: payload => dispatch(fetchCustomers(payload)),
    fetchProducts: payload => dispatch(fetchProducts(payload)),
  };
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Invoices)


