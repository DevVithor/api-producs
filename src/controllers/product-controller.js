const client = require('../service/prisma');
const data = require('../data/index.json');

module.exports = {
  async index(req, res) {
    const products = await client.product.findMany({
      take: 10,
    });

    return res.status(200).json(products);
  },
  async findById(req, res) {
    const id = req.params.id;
    const product = await client.product.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!product) {
      return res
        .status(404)
        .json({ message: `Product [${id}] does not exists!` });
    }

    return res.status(200).json(product);
  },
  async create(req, res) {
    try {
      const response = await client.product.createMany({
        data,
      });

      return res.status(201).json({ data, response });
    } catch (error) {
      console.error('Error creating the product:', error);
      res.status(500).send('Error creating the product.');
    }
  },
  async updateAll(req, res) {
    try {
      const id = req.params.id;
      const product = await client.product.update({
        where: {
          id: Number(id),
        },
        data: {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          amount: req.body.amount,
        },
      });
      return res.status(201).json(product);
    } catch (error) {
      console.error('Error update this product', error);
      res.status(404).json({ message: `Error this ID not exits` });
    }
  },

  async updatePrice(req, res) {
    try {
      const id = req.params.id;
      const productAlreadyExist = await client.product.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!productAlreadyExist) {
        throw new Error(`Error this ID [${id}] not exits`);
      }

      const currentProdutPricePercentage =
        (productAlreadyExist.price * 10) / 100;
      const newProductPrice =
        productAlreadyExist.price - currentProdutPricePercentage;

      const product = await client.product.update({
        where: {
          id: Number(id),
        },
        data: {
          price: newProductPrice,
          promotionPrice: true,
        },
      });

      return res.status(201).json(product);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  async delete(req, res) {},
};
