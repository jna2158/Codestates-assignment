const express = require("express");
const router = express.Router();
const linksController = require("../controllers/links");

router.get("/", linksController.get);
router.post("/", linksController.post);
router.get("/:id", linksController.redirection);

module.exports = router;