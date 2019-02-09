import React, { Component } from 'react';
import { Button, FormGroup, ControlLabel, FormControl, Form, Modal} from 'react-bootstrap';
import { connect } from 'react-redux'
import {
    actChangeInputProductValue,
    actAddNewProduct,
    actProductModalShow,
    actProductModalHide,
    fetchEditProducts,
    fetchPutProducts,
} from "../../reducers/actions_creators";
import './styles.css'

class AddNewProduct extends Component {
//TODO: add prop.types
    finishEditProduct = (id, product) => (event) => {
        console.log('finishEditProduct product', product)
        event.preventDefault(event);
        this.props.fetchEditProducts({id, product})
    }
    addNewProduct = (product) => (event) => {
        console.log('addNewProduct product', product)
        event.preventDefault(event);
        this.props.fetchPutProducts(product)
    }

    render() {
        const newProduct = {
            name: this.props.products.productName,
            price: this.props.products.productPrice,
        }
        return (
            <div className="static-modal add-customer-modal">
                <Modal show={this.props.products.productModalShow} onHide={this.props.actProductModalHide}>
                    <Modal.Header>
                        <Modal.Title>Add New Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    </Modal.Body>
                    <Form className="add-form">
                        <FormGroup>
                            <ControlLabel className="">Product Name:</ControlLabel>
                            <FormControl type="text" placeholder="Input Product Name" className=""
                                         onChange={this.props.actChangeInputProductValue}
                                         value={this.props.products.productName} name="productName"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel className="">Product Price:</ControlLabel>
                            <FormControl type="text" placeholder="Input Product Price" className=""
                                         onChange={this.props.actChangeInputProductValue}
                                         value={this.props.products.productPrice} name="productPrice"/>
                        </FormGroup>
                    </Form>
                    <Modal.Footer>
                        <Button bsStyle="info" className="btn" onClick={this.props.actProductModalHide}>Cancel</Button>
                        <Button bsStyle="info" className="btn" onClick={this.props.products.editingProduct === 0 ? this.addNewProduct(newProduct) : this.finishEditProduct(this.props.products.editingProduct, newProduct)}
                                disabled={this.props.products.productName === "" || this.props.products.productPrice === ""}>Save</Button>
                    </Modal.Footer>
                </Modal>
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
      actChangeInputProductValue: payload => dispatch(actChangeInputProductValue(payload)),
      actAddNewProduct: payload => dispatch(actAddNewProduct(payload)),
      actProductModalShow: payload => dispatch(actProductModalShow(payload)),
      actProductModalHide: payload => dispatch(actProductModalHide(payload)),
      fetchEditProducts: payload => dispatch(fetchEditProducts(payload)),
      fetchPutProducts: payload => dispatch(fetchPutProducts(payload)),
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddNewProduct)


