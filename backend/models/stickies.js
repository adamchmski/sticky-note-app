const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stickySchema = new Schema({
  color: { type: String, required: true },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  size: {
    height: { type: Number, required: true },
    width: { type: Number, required: true },
  },
  zIndex: { type: Number, required: true },
  text: { type: String },
});

module.exports = mongoose.model("Sticky", stickySchema);
