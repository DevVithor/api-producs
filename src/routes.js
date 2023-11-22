const { Router } = require('express');

const productsController = require('./controllers/product-controller');
const saleController = require('./controllers/sale-controller');

const router = Router();

/**
 * Metodos HTTP GET POST PUT PATCH e DELETE
 */

// Get Buscar
router.get('/sale', saleController.index);
router.get('/products', productsController.index);
router.get('/product/:id', productsController.findById);
// Post Criar
router.post('/product', productsController.create);
// Put ou Patch atualizar
router.put('/product/:id', productsController.updateAll);
router.patch('/product/:id', productsController.updatePrice);
// Delete deletar
router.delete('/product/:id', productsController.delete);

module.exports = router;
