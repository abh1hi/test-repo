// File: backend/models/ForecastResponse.js
// Description: Mongoose schema and model for Forecast Responses.
// Author: Abhinav
// Date: 23/09/2025

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Sub-document for individual data points
const dataPointSchema = new Schema({
  ds: {
    type: String,
    required: true,
  },
  y: { type: Number },
  yhat: { type: Number },
  yhat_lower: { type: Number },
  yhat_upper: { type: Number },
  yhat_final: { type: Number },
}, { _id: false });

// Sub-document for forecast metadata
const forecastMetaSchema = new Schema({
  freq: {
    type: String,
    required: true,
  },
  train_start: {
    type: String,
    required: true,
  },
  train_end: {
    type: String,
    required: true,
  },
  horizon: {
    type: Number,
    required: true,
  },
  holidays_used: {
    type: [String],
    default: [],
  },
  original_rows: {
    type: Number,
    required: true,
  },
  processed_rows: {
    type: Number,
    required: true,
  },
  null_dates: {
    type: Number,
    required: true,
  },
  null_targets: {
    type: Number,
    required: true,
  },
}, { _id: false });

// Main schema for the forecast response
const forecastResponseSchema = new Schema({
  meta: {
    type: forecastMetaSchema,
    required: true,
  },
  // 'Mixed' type allows for any object structure, like Python's Dict[str, Any]
  ai_adjustment: {
    type: Schema.Types.Mixed,
  },
  history: [dataPointSchema],
  forecast_base: [dataPointSchema],
  forecast_final: [dataPointSchema],
}, { timestamps: true });

module.exports = mongoose.model('ForecastResponse', forecastResponseSchema);

