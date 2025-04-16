import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    published: {
      type: Date,
      default: Date.now,
    },
    availableCopie: {
      type: Number,
      required: true,
      default: 1,
      min: [0, "canot be -ve val"],
    },
    image: {
      type: String,
      required: true,
    },
    isDelet: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
