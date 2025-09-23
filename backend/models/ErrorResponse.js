// File: backend/models/ErrorResponse.js
// Description: Mongoose schema and model for Error Responses.
// Author: Abhinav
// Date: 23/09/2025

const mongoose = require('mongoose');
const { Schema } = mongoose;

const errorResponseSchema = new Schema({
  error: {
    type: String,
    required: true,
  },
  detail: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('ErrorResponse', errorResponseSchema);

