// File: backend/models/AIAdjustmentRequest.js
// Description: Mongoose schema and model for AI Adjustment Requests.
// Author: Abhinav
// Date: 23/09/2025

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Sub-document schema for 'RecentSummary'
const recentSummarySchema = new Schema({
  last4_growth_pct: {
    type: Number,
    required: true,
  },
  yoy_last_period_pct: {
    type: Number,
    required: true,
  },
  volatility_index: {
    type: Number,
    required: true,
  },
}, { _id: false }); // No _id for sub-documents

// Main schema for 'AIAdjustmentRequest'
const aiAdjustmentRequestSchema = new Schema({
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
  recent_summary: {
    type: recentSummarySchema, // Nesting the summary schema
    required: true,
  },
  holidays_window: {
    type: [String],
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('AIAdjustmentRequest', aiAdjustmentRequestSchema);

