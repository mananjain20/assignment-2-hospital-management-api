const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    totalBeds: { type: Number, required: true, min: 0 },
    availableBeds: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;
