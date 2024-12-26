const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid phone number']
  },
}, { timestamps: true });

// Author can only be linked to up to 5 books
authorSchema.virtual("books", {
  ref: "Book",
  localField: "_id",
  foreignField: "author"
});

module.exports = mongoose.model("Author", authorSchema);
