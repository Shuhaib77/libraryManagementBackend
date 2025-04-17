import express from "express";
import { errorHndler } from "../middlewares/globelErrors.js";
import tryCatch from "../middlewares/tryCatch.js";
import { borrowBook, getBorrowedBooksByUser, returnBook } from "../controller/borrow.js";
import { verifytoken } from "../middlewares/authverify.js";

const borrowRoute = express.Router();
borrowRoute.post("/borrow/:id", errorHndler, verifytoken, tryCatch(borrowBook));
borrowRoute.post(
 "/book/return/:bookId",
  errorHndler,
  verifytoken,
  tryCatch(returnBook)
);
borrowRoute.get(
  "/boorrowbooks/:userId",
  errorHndler,
  verifytoken,
  tryCatch(getBorrowedBooksByUser)
);

export default borrowRoute;
