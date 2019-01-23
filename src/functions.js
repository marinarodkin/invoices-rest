import uuidv4 from 'uuid/v4';

export  function getItemPrice (id, products) {
    console.log('id', id, 'products', products)
    const result = products.find(item => item.name == id);
    return result.price
}

/*make ids for new items*/
export  function getInvoiceId() {
    const code = uuidv4();
    const id = code.substr(0,4)
    return id;
}
export  function getCustomerId() {
    const code = uuidv4();
    const id = code.substr(0,4)
    return id;
}

