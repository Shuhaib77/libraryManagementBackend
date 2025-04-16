import express from "express";
import { errorHndler } from "../middlewares/globelErrors.js";
import tryCatch from "../middlewares/tryCatch.js";
import { borrowBook, returnBook } from "../controller/borrow.js";
import { verifytoken } from "../middlewares/authverify.js";

const borrowRoute = express.Router();
borrowRoute.post("/borrow/:id", errorHndler, verifytoken, tryCatch(borrowBook));
borrowRoute.post("/book/return/:bookId", errorHndler,verifytoken, tryCatch(returnBook));

export default borrowRoute;
