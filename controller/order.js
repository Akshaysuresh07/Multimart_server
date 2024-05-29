const Orders = require('../model/order');


exports.CreateOrder=  async (req, res) => {
    const newOrder = new Orders(req.body);
    try {
        const newAddedOrder = await newOrder.save();
        res.status(201).json(newAddedOrder)
    } catch (err) {
        res.status(500).json(err)
    }
}