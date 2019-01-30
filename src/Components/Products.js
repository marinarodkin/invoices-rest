import React, { Component } from 'react';
import {  Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux'
import {actSetAddNewActive} from "./../reducers/actions_creators.js"
import {
    actDeleteProduct,
    actStartEditingProduct,
    actProductModalShow,
    fetchProducts,
    fetchDeleteProducts
} from "./../reducers/actions_creators";


class Products extends Component {

    componentDidMount() {
        this.props.fetchProducts();
    }

    deleteProduct = (id) => (event) => {
        event.preventDefault(event);
        this.props.fetchDeleteProducts(id)
    }
    startEditProduct = (id) => (event) => {
        event.preventDefault(event);
        this.props.actStartEditingProduct(id)
    }

    render() {

        const products = this.props.products.products;
        return (
            <div className = "" >

                <div className= "top-line top-line-inv">
                    <div className = " title">Products </div>
                    <Button className="col-xs-2 pull-right" bsStyle="info" onClick={this.props.actProductModalShow}>Add New</Button>
                </div>
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th className="col-xs-1 text-center">#</th>
                        <th className="col-xs-3 text-center">Product</th>
                        <th className="col-xs-1 text-center">Price</th>
                        <th className="col-xs-1 text-center"></th>
                        <th className="col-xs-1 text-center"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(item => (
                        <tr key = {item.id}>
                            <td  className ="text-center">{item.id}</td>
                            <td className ="text-center">{item.name}</td>
                            <td className="text-center">{item.price}</td>
                            <td className="text-center" ><Button className="" bsStyle="info" onClick={this.startEditProduct(item.id)} >Edit</Button></td>
                            <td className="text-center" ><Button className="" bsStyle="info" onClick={this.deleteProduct(item.id)} >Delete</Button></td>
                        </tr>
                    ))}
                    </tbody>
                </Table>;
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {

        products: store.products,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actSetAddNewActive: payload => dispatch(actSetAddNewActive(payload)),
        actDeleteProduct: payload => dispatch(actDeleteProduct(payload)),
        actStartEditingProduct: payload => dispatch(actStartEditingProduct(payload)),
        actProductModalShow: payload => dispatch(actProductModalShow(payload)),
        fetchProducts: payload => dispatch(fetchProducts(payload)),
        fetchDeleteProducts: payload => dispatch(fetchDeleteProducts(payload)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Products)
