const Book = require("../models/bookModel");
const Author = require("../models/authorModel");

exports.createBook = async (req, res) => {
  try {
    const { title, author, isbn, availableCopies } = req.body;
    const authorExists = await Author.findById(author);
    if (!authorExists) {
      return res.status(400).json({ message: "Author not found" });
    }

    const book = new Book({ title, author, isbn, availableCopies });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("author");
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.borrowBook = async (req, res) => {
  try {
    const { bookId, borrowerId } = req.body;
    const book = await Book.findById(bookId);
    const borrower = await Borrower.findById(borrowerId);

    if (!book || !borrower) {
      return res.status(404).json({ message: "Book or Borrower not found" });
    }

    if (book.availableCopies <= 0) {
      return res.status(400).json({ message: "No copies available" });
    }

    if (borrower.membershipType === "standard" && borrower.borrowedBooks.length >= 5) {
      return res.status(400).json({ message: "Standard members can borrow only 5 books" });
    }
    if (borrower.membershipType === "premium" && borrower.borrowedBooks.length >= 100) {
      return res.status(400).json({ message: "Premium members can borrow up to 100 books" });
    }

    book.availableCopies -= 1;
    borrower.borrowedBooks.push(bookId);
    await book.save();
    await borrower.save();

    res.status(200).json({ message: "Book borrowed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
