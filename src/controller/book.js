import {
  createBookService,
  deleteBookService,
  getbookSrevice,
  updateBookSrevice,
} from "../service/bookService.js";

export const createBook = async (req, res) => {
  const { title, author, isbn, published, availableCopie } = req.body;
  const image = req.cloudinaryImageUrl;

  if (!title || !author || !isbn || !availableCopie || !published || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const data = await createBookService(
    title,
    author,
    isbn,
    availableCopie,
    published,
    image
  );

  if (!data) {
    return res.status(400).json({ message: "Book not added!" });
  }

  res.status(201).json({ message: "Book successfully added", data });
};

export const getBooks = async (req, res) => {
  const { search } = req.query;
  const data = await getbookSrevice(search);

  if (!data || data.length === 0) {
    return res.status(404).json({ message: "No books found!" });
  }

  res.status(200).json({ message: "Books found!", data });
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const image = req.cloudinaryImageUrl;
  const body = req.body;
  console.log(body,"body");
  

  if (!id) {
    return res.status(400).json({ message: "Invalid book id!" });
  }

  const data = await updateBookSrevice(id, body, image);

  if (!data) {
    return res.status(404).json({ message: "Book not found!" });
  }

  res.status(200).json({ message: "Book updated successfully", data });
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Invalid book ID!" });
  }

  const data = await deleteBookService(id);

  if (!data) {
    return res
      .status(404)
      .json({ message: "Book not found or already deleted" });
  }

  res.status(200).json({ message: "Book deleted (soft)", data });
};
