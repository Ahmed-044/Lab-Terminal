const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true
  },
  isbn: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return v >= 0;
      },
      message: "ISBN number must be a positive number"
    }
  },
  availableCopies: {
    type: Number,
    default: 0,
    required: true
  },
  timesBorrowed: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

// Custom validation for available copies when book is borrowed more than 10 times
bookSchema.pre("save", function(next) {
  if (this.timesBorrowed > 10 && this.availableCopies > 100) {
    this.availableCopies = 100;
  }
  next();
});

module.exports = mongoose.model("Book", bookSchema);
