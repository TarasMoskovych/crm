const Order = require('./../models/Order');
const calculateOverview = require('./../services/analytic');
const errorHandler = require('./../helpers/errorHandler');

module.exports.analytic = (req, res) => {

};

module.exports.overview = async(req, res) => {
  try {
    res.status(200).json(calculateOverview(await Order.find({ user: req.user.id }).sort({ date: 1 })));
  } catch(e) {
    errorHandler(res, e);
  }
};
