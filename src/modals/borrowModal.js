import mongoose from "mongoose";

const borrowSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    borrowDate: {
      type: Date,
      default: Date.now,
    },
    returnDate: {
      type: Date,
  
    },
    returned: { type: Boolean, default: false },
  },
  { timsstamps: true }
);

const Borrow = mongoose.model("Borrow", borrowSchema);

export default Borrow
