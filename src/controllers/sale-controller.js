const client = require('../service/prisma');

module.exports = {
  async index(req, res) {
    // trazer todas as vendes
    const sales = await client.sale.findMany({});

    return res.status(200).json(sales);
  },
  async create(req, res) {},
  async update(req, res) {},
  async delete(req, res) {},
};
