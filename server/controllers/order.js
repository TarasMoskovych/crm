const Order = require('./../models/Order');
const errorHandler = require('./../helpers/errorHandler');

module.exports.getAll = async(req, res) => {
  const query = {
    user: req.user.id
  };

  if (req.query.start) {
    query.date = {
      $gte: req.query.start
    };
  }

  if (req.query.end) {
    if (!query.date) {
      query.date = {};
    }

    query.date['$lte'] = req.query.end;
  }

  if (req.query.order) {
    query.order = +req.query.order;
  }

  try {
    const orders$ = Order.find(query);
    const length = (await orders$).length;
    const orders = await orders$.sort({ date: -1 }).skip(+req.query.offset).limit(+req.query.limit);

    res.status(200).json({ orders, length });
  } catch(e) {
    errorHandler(res, e);
  }
};

module.exports.create = async(req, res) => {
  const userId = req.user.id;

  try {
    const lastOrder = await Order.findOne({ user: userId }).sort({ date: -1 });
    const orderNumber = lastOrder ? lastOrder.order : 0;

    const order = await new Order({
      list: req.body.list,
      user: userId,
      order: orderNumber + 1
    }).save();

    res.status(201).json(order);
  } catch(e) {
    errorHandler(res, e);
  }
};
