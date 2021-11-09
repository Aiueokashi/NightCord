import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
});

module.exports = mongoose.model('Event', eventSchema);