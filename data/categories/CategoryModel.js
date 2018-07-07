const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
  },
  parentId: mongoose.Schema.Types.ObjectId,
  ancestorIds: [mongoose.Schema.Types.ObjectId],
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Category", CategorySchema);
