const Position = require('./../models/Position');
const errorHandler = require('./../helpers/errorHandler');

module.exports.getByCategoryId = async(req, res) => {
 try {
  const positions = await Position.find({
    category: req.params.categoryId,
    user: req.user.id
  });

  res.status(200).json(positions);
 } catch(e) {
  errorHandler(res, e);
 }
};

module.exports.create = async(req, res) => {
  try {
    const { name, cost, category } = req.body;
    const position = await new Position({ name, cost, category, user: req.user.id }).save();

    res.status(201).json(position);
  } catch(e) {
    errorHandler(res, e);
  }
};

module.exports.update = async(req, res) => {
  try {
    const position = await Position.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(position);
  } catch(e) {
    errorHandler(res, e);
  }
};

module.exports.remove = async(req, res) => {
  try {
    await Position.remove({ _id: req.params.id });

    res.status(200).json({ message: 'position was removed' });
  } catch(e) {
    errorHandler(res, e);
  }
};
