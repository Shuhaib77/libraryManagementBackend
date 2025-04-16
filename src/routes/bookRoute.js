import express from "express";

import { errorHndler } from "../middlewares/globelErrors.js";

import { createBook, deleteBook, getBooks, updateBook } from "../controller/book.js";

import uploadimage from "../middlewares/multer.js";
import tryCatch from "../middlewares/tryCatch.js";

const bookRoute = express.Router();
bookRoute.post("/book", errorHndler, uploadimage, tryCatch(createBook));
 bookRoute.get("/books",errorHndler,tryCatch(getBooks) )
 bookRoute.put("/update/books/:id",errorHndler,uploadimage,tryCatch(updateBook) )
 bookRoute.put("/delete/book/:id",errorHndler,tryCatch(deleteBook) )
export default bookRoute;
