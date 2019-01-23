import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux'
import {
  actSetAddNewActive,
  actDeleteInvoice,
  actStartEditing
} from './../reducers/actions_creators';
import AddNew from './AddNew/AddNew';

class Invoices extends Component {
  deleteInvoice = id => event => {
    event.preventDefault(event);
    this.props.actDeleteInvoice({ id });
  };

  startEditInvoice = id => event => {
    event.preventDefault(event);
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
        {isAddingInvoice ? <AddNew /> : null}
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
                <td className="text-center">{item.customer}</td>
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
    actDeleteInvoice: payload => dispatch(actDeleteInvoice(payload)),
    actStartEditing: payload => dispatch(actStartEditing(payload))
  };
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Invoices)


