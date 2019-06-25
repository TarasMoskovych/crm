const AnalyticService = require('./../services/analytic');
const errorHandler = require('./../helpers/errorHandler');

module.exports.analytic = async(req, res) => {
  try {
    res.status(200).json(await AnalyticService.calculateAnalytic(req.user.id));
  } catch(e) {
    errorHandler(res, e);
  }
};

module.exports.overview = async(req, res) => {
  try {
    res.status(200).json(await AnalyticService.calculateOverview(req.user.id));
  } catch(e) {
    errorHandler(res, e);
  }
};
