import React, { Component } from 'react';
import { Button, FormGroup, ControlLabel, FormControl, Form, Modal} from 'react-bootstrap';
import { connect } from 'react-redux'
import {
    actChangeInputProductValue,
    actAddNewProduct,
    actProductModalShow,
    actProductModalHide,
    actFinishEditingProduct
} from "../../reducers/actions_creators";
import './styles.css'

class AddNewProduct extends Component {
    finishEditProduct = (id) => (event) => {
        event.preventDefault(event);
        this.props.actFinishEditingProduct(id)
    }
    render() {
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
                        <Button bsStyle="info" className="btn" onClick={this.props.products.editingProduct === 0 ? this.props.actAddNewProduct : this.finishEditProduct(this.props.products.editingProduct)}
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
      actFinishEditingProduct: payload => dispatch(actFinishEditingProduct(payload)),
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddNewProduct)


