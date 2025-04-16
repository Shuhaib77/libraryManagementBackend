import Book from "../modals/bookModal.js";

export const createBookService = async (
  title,
  author,
  isbn,
  availableCopie,
  published,
  image
) => {
  if (!title || !author || !isbn || !availableCopie || !published || !image) {
    throw new Error("alll fields are requirdd");
  }
  const checkbook = await Book.findOne({ isbn: isbn });
  if (checkbook) {
    throw new Error("this book allready exists");
  }
  const newBook = await Book.create({
    title,
    author,
    isbn,
    availableCopie,
    published,
    image,
  });
  return newBook;
};

export const getbookSrevice = async (search) => {
  try {
    console.log(search, "popopo");

    const query = search
      ? {
          isDelet: false,
          $or: [
            { title: { $regex: search, $options: "i" } },
            { author: { $regex: search, $options: "i" } },
          ],
        }
      : { isDelet: false };

    const books = await Book.find(query);
    if (!books || books.length === 0) {
      throw new Error("no books exists!!");
    }
    return books;
  } catch (error) {
    console.log(error);
  }
};

export const updateBookSrevice = async (id, body, image) => {
  if (!id) {
    throw new Error("bokk not findede");
  }
  const book = await Book.findById(id);
  if (!book) {
    throw new Error("book not exists");
  }
  if (image) {
    body.image = image;
  }
  console.log(body, "ghghg");

  const updBook = await Book.findByIdAndUpdate(id, body, {
    new: true,
  });
  return updBook;
};

export const deleteBookService = async (id) => {
  const deleted = await Book.findOneAndUpdate(
    { _id: id, isDelet: false },
    { isDelet: true },
    { new: true }
  );

  if (!deleted) {
    throw new Error("Book not found or already deleted");
  }
  return deleted
};
