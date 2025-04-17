import Book from "../modals/bookModal.js";
import Borrow from "../modals/borrowModal.js";

export const borrowBookService = async (id, userId) => {
  const book = await Book.findById(id);
  const count = book?.availableCopie;
  console.log(userId, "useriddd");

  if (!book || count <= 0) {
    throw new Error("book not available");
  }
  const newBorrow = await Borrow.create({
    user: userId,
    book: book._id,
  });
  book.availableCopie = count - 1;
  await book.save();

  return newBorrow;
};

export const borrowReturnService = async (bookId, userId) => {
  if (!bookId || !userId) {
    throw new Error("book,user not found");
  }
  console.log(bookId, "bookideeee");

  const book = await Book.findById(bookId);
  console.log(book, "boonkeeeee");

  if (!book) {
    throw new Error("book  not found");
  }

  const borrowRecord = await Borrow.findOne({
    user: userId,
    book: bookId,
    returned: false,
  });

  if (!borrowRecord) {
    throw new Error("no active borrow found");
  }

  borrowRecord.returned = true;

  await borrowRecord.save();
  await Book.findByIdAndUpdate(bookId, { $inc: { availableCopie: 1 } });
  return borrowRecord;
};

export const borrowByUserService = async (userId) => {
  const borrowBooks = await Borrow.find({ user: userId, returned: false })
    .populate("book")
    .populate("user");
  return borrowBooks;
};
