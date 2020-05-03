import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux'
import {
  actSetAddNewActive,
  actStartEditing,
  fetchInvoices, fetchDeleteInvoices, fetchInvoiceDetails,
  fetchCustomers,
  fetchProducts,
  actInvoiceModalShow, actProductModalShow,
} from './../reducers/actions_creators';
import AddNewInvoice from './AddNew/AddNewInvoice11';

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
          <div className=" title">Заказы </div>
          <Button
              className="col-xs-3 pull-right"
              bsStyle="info"
              onClick={this.props.actInvoiceModalShow}
          >
            Добавить заказ
          </Button>
        </div>

        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th className="col-xs-2 text-center">#</th>
              <th className="col-xs-6 text-center">Клиент</th>
              <th className="col-xs-1 text-center">Инструмент</th>
              <th className="col-xs-1 text-center">Количество дней</th>
              <th className="col-xs-1 text-center">Залог</th>
              <th className="col-xs-1 text-center">Оплата</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(item => (
              <tr key={item.id}>
                <td className="text-center">{item.id}</td>
                <td className="text-center">имя клиента</td>
                <td className="text-center">название инструмента</td>
                <td className="text-center">2 </td>
                <td className="text-center">111111</td>
                <td className="text-center">111111</td>
                <td className="col-xs-1 border-none">
                  <Button className="table-button table-button--first" bsStyle="info" onClick={this.startEditInvoice(item.id)}>
                    Редактировать
                  </Button>
                </td>
                <td className="col-xs-1 border-none">
                  <Button className="table-button" bsStyle="info" onClick={this.deleteInvoice(item.id)}>
                    Удалить
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
    actInvoiceModalShow: payload => dispatch(actInvoiceModalShow(payload)),
  };
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Invoices)


