const Category = require('./../models/Category');
const Position = require('./../models/Position');
const errorHandler = require('./../helpers/errorHandler');

module.exports.getAll = async(req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id });

    res.status(200).json(categories);
  } catch(e) {
    errorHandler(res, e);
  }
};

module.exports.getById = async(req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    res.status(200).json(category);
  } catch(e) {
    errorHandler(res, e);
  }
};

module.exports.create = async(req, res) => {
  try {
    const imageSrc = req.file ? req.file.path : '';
    const category = await new Category({ name: req.body.name, imageSrc, user: req.user.id }).save();

    res.status(201).json(category);
  } catch(e) {
    errorHandler(res, e);
  }
};

module.exports.update = async(req, res) => {
  const updated = { name: req.body.name };

  if (req.file) {
    updated.imageSrc = req.file.path
  }

  try {
    const category = await Category.findOneAndUpdate({ _id: req.params.id }, { $set: updated }, { new: true });

    res.status(200).json(category);
  } catch(e) {
    errorHandler(res, e);
  }
};

module.exports.remove = async(req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id);
    await Category.remove({ _id: id });
    await Position.remove({ category: id });

    res.status(200).json({ message: `Category ${category.name} was removed.` });
  } catch(e) {
    errorHandler(res, e);
  }
};
