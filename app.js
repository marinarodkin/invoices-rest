var express = require('express'),
    bodyParser = require('body-parser'),
    http = require('http'),
    path = require('path'),
    Sequelize = require('sequelize'),
    _ = require('lodash');


sequelize = new Sequelize('sqlite://' + path.join(__dirname, 'invoices.sqlite'), {
  dialect: 'sqlite',
  storage: path.join(__dirname, 'invoices.sqlite')
});

Customer = sequelize.define('customers', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  }
});

Product = sequelize.define('products', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.DECIMAL
  },
    deposit: {
        type: Sequelize.DECIMAL
    },
    payment: {
        type: Sequelize.DECIMAL
    },
   category: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
});

Invoice = sequelize.define('invoices', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  customer_id: {
    type: Sequelize.INTEGER
  },
  discount: {
    type: Sequelize.DECIMAL
  },
  total: {
    type: Sequelize.DECIMAL
  }
});

InvoiceItem = sequelize.define('invoice_items', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  invoice_id: {
    type: Sequelize.INTEGER
  },
  product_id: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.DECIMAL
  }
});

sequelize.sync({
    force: true
}).then(function() {
  Customer.create({
    name: "Черепанов Василий Яковлевич",
    address: "Мира 163-17",
    phone: "8-919-1181765"
  });

  Customer.create({
    name: "Акинин Андрей Петрович",
    address: "Ленина 17-42",
    phone: "8-937-2136634"
  });

  Customer.create({
    name: "Котляров Дмитрий Степанович",
    address: "Индустриальная 14-51",
    phone: "8-960-8399219"
  });

    Customer.create({
        name: "Яшкин Сергей Владимирович",
        address: "Степана Разина 34-91",
        phone: "8-937-7799211"
    });

    Customer.create({
        name: "Юсупов Андрей Алекксеевич",
        address: "Ворошилова 104-211",
        phone: "8-903-8799334"
    });

  Product.create({
    name: "Бензобур ADA GROUNDDRILL-7",
    price: 9000,
      deposit: 3000,
      payment: 1000,
      description: "Смесь 1:25, шнек до 250 мм.",
      category: "Мотобуры"
  });

  Product.create({
    name: "Пила торцовочная DeWolt DW 713",
    price: 23200,
      deposit: 3000,
      payment: 1000,
      description: "Диск 250 мм.,переходное кольцо,ключ, пылесборник",
      category: "Режущий инструмент"
  });

  Product.create({
    name: "Перфоратор MAKITA HR 2470",
    price: 8000,
      deposit: 3000,
      payment: 1000,
      description: "Смесь 1:25, шнек до 250 мм.",
      category: "Мотобуры"
  });

  Product.create({
    name: "Сварочный аппарат, инвертор РЕСАНТА 220",
    price: 7000,
      deposit: 3000,
      payment: 1000,
      description: "Тип патрона - SDS Plus",
      category: "Перфораторы"
  });

  Product.create({
    name: "Шлифмашинка ленточная MAKITA 9910",
    price: 8000,
      deposit: 3000,
      payment: 1000,
      description: "Ширина ленты 75 мм",
      category: "Обработка материалов"
  });

}).catch(function(e) {
  console.log("ERROR SYNCING WITH DB", e);
});

var app = module.exports = express();
app.set('port', process.env.PORT || 8000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// CUSTOMERS API

app.route('/api/customers')
  .get(function(req, res) {
    Customer.findAll().then(function(customers) {
      res.json(customers);
    })
  })
  .post(function(req, res) {
    var customer = Customer.build(_.pick(req.body, ['name', 'address', 'phone']));
    customer.save().then(function(customer){
      res.json(customer);
    });
  });

app.route('/api/customers/:customer_id')
    .get(function(req, res) {
        Customer.findById(req.params.customer_id).then(function(customer) {
            res.json(customer);
        });
    })
    .put(function(req, res) {
        Customer.findById(req.params.customer_id).then(function(customer) {
            customer.update(_.pick(req.body, ['name', 'address', 'phone'])).then(function(customer) {
                res.json(customer);
            });
        });
    })
    .delete(function(req, res) {
        Customer.findById(req.params.customer_id).then(function(customer) {
            customer.destroy().then(function(customer) {
                res.json(customer);
            });
        });
    });

// PRODUCTS API

app.route('/api/products')
  .get(function(req, res) {
    Product.findAll().then(function(products) {
      res.json(products);
    })
  })
  .post(function(req, res) {
        var product = Product.build(_.pick(req.body, ['name', 'price', 'category', 'deposit', 'description', 'payment']));
    product.save().then(function(product){
      res.json(product);
    });
  });

app.route('/api/products/:product_id')
  .get(function(req, res) {
    Product.findById(req.params.product_id).then(function(product) {
      res.json(product);
    });
  })
  .put(function(req, res) {
    Product.findById(req.params.product_id).then(function(product) {
            product.update(_.pick(req.body, ['name', 'price', 'category', 'deposit', 'description', 'payment'])).then(function(product) {
        res.json(product);
      });
    });
  })
  .delete(function(req, res) {
    Product.findById(req.params.product_id).then(function(product) {
      product.destroy().then(function(product) {
        res.json(product);
      });
    });
  });


// INVOICES API

app.route('/api/invoices')
    .get(function(req, res) {
        Invoice.findAll().then(function(invoices) {
            res.json(invoices);
        })
    })
    .post(function(req, res) {
        var invoice = Invoice.build(_.pick(req.body, ['customer_id', 'discount', 'total']));
        invoice.save().then(function(invoice){
            res.json(invoice);
        });
    });

app.route('/api/invoices/:invoice_id')
    .get(function(req, res) {
        Invoice.findById(req.params.invoice_id).then(function(invoice) {
            res.json(invoice);
        });
    })
    .put(function(req, res) {
        Invoice.findById(req.params.invoice_id).then(function(invoice) {
            invoice.update(_.pick(req.body, ['customer_id', 'discount', 'total'])).then(function(invoice) {
                res.json(invoice);
            });
        });
    })
    .delete(function(req, res) {
        Invoice.findById(req.params.invoice_id).then(function(invoice) {
            invoice.destroy().then(function(invoice) {
                res.json(invoice);
            });
        });
    });


// INVOICE ITEMS API

app.route('/api/invoices/:invoice_id/items')
    .get(function(req, res) {
        InvoiceItem.findAll({where: { invoice_id: req.params.invoice_id }}).then(function(invoice_items) {
            res.json(invoice_items);
        })
    })
    .post(function(req, res) {
        var invoice_item = InvoiceItem.build(_.pick(req.body, ['product_id', 'quantity']));
        invoice_item.set('invoice_id', req.params.invoice_id);
        invoice_item.save().then(function(invoice_item){
            res.json(invoice_item);
        });
    });

app.route('/api/invoices/:invoice_id/items/:id')
    .get(function(req, res) {
        InvoiceItem.findById(req.params.id).then(function(invoice_item) {
            res.json(invoice_item);
        });
    })
    .put(function(req, res) {

        InvoiceItem.findById(req.params.id).then(function(invoice_item) {
      invoice_item.update(_.pick(req.body, ['product_id', 'quantity'])).then(function(invoice_item) {
        res.json(invoice_item);
      });
    });
  })
  .delete(function(req, res) {
        console.log(req.params);
        InvoiceItem.findById(req.params.id).then(function(invoice_item) {
      invoice_item.destroy().then(function(invoice_item) {
        res.json(invoice_item);
      });
    });
  });


// Redirect all non api requests to the index
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Starting express server
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
