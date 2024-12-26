const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.post("/", bookController.createBook);
router.get("/", bookController.getAllBooks);
router.post("/borrow", bookController.borrowBook);

module.exports = router;
