const { Router } = require('express');

const productsController = require('./controllers/product-controller');
const saleController = require('./controllers/sale-controller');

const router = Router();

router.get('/sale', saleController.index);
router.get('/products', productsController.index);
router.get('/product/:id', productsController.findById);

router.post('/product', productsController.create);

router.put('/product/:id', productsController.updateAll);
router.patch('/product/:id', productsController.updatePrice);

router.delete('/product/:id', productsController.delete);

module.exports = router;
