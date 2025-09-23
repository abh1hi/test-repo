// File: backend/models/ForecastRequest.js
// Description: Mongoose schema and model for Forecast Requests.
// Author: Abhinav
// Date: 23/09/2025

const mongoose = require('mongoose');
const { Schema } = mongoose;

const forecastRequestSchema = new Schema({
  industry: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: { type: String },
  city: { type: String },
  freq: {
    type: String,
    required: true,
    enum: ['D', 'W', 'M'],
  },
  horizon: {
    type: Number,
    required: true,
  },
  date_col: {
    type: String,
    required: true,
  },
  target_col: {
    type: String,
    required: true,
  },
  apply_holidays: {
    type: Boolean,
    default: true,
  },
  apply_ai_adjustment: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('ForecastRequest', forecastRequestSchema);

