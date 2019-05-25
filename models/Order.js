const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  order: {
    type: Number,
    required: true
  },
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId
  },
  list: [
    {
      name: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      cost: {
        type: Number,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model('orders', schema);
