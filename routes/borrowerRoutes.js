const express = require("express");
const router = express.Router();
const borrowerController = require("../controllers/borrowerController");

router.post("/", borrowerController.createBorrower);
router.get("/", borrowerController.getAllBorrowers);

module.exports = router;
