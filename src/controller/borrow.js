import {
  borrowBookService,
  borrowByUserService,
  borrowReturnService,
} from "../service/borrowService.js";

export const borrowBook = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id;
  if (!id) {
    throw new Error("Book ID is missing.");
  }
  const data = await borrowBookService(id, userId);

  res.status(200).json({ message: "Borrowing success", data });
};

export const returnBook = async (req, res) => {
  const { bookId } = req.params;
  const userId = req.user?._id;

  console.log(bookId, userId);

  if (!bookId || !userId) {
    return res.status(400).json({ message: "bookId or userId not found" });
  }

  const data = await borrowReturnService(bookId, userId);
  res.status(200).json({ message: "Book returned successfully", data: data });
};

export const getBorrowedBooksByUser = async (req, res) => {
    const { userId } = req.params;
  
    if (!userId) {
      res.status(404).json({ message: "user not found" });
      return;
    }
  
    const data = await borrowByUserService(userId);
  
    res.status(200).json({
      message: "User's borrowed books fetched successfully",
      data,
    });
  };
