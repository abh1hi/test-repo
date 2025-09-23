// File: backend/models/AIAdjustmentResponse.js
// Description: Mongoose schema and model for AI Adjustment Responses.
// Author: Abhinav
// Date: 23/09/2025

const mongoose = require('mongoose');
const { Schema } = mongoose;

const aiAdjustmentResponseSchema = new Schema({
  adjustment_pct: {
    type: Number,
    required: true,
    min: -20, // Validation for minimum value
    max: 20,  // Validation for maximum value
  },
  rationale: {
    type: String,
    required: true,
  },
  sources: {
    type: [String],
    default: undefined,
  },
}, { timestamps: true });

module.exports = mongoose.model('AIAdjustmentResponse', aiAdjustmentResponseSchema);

