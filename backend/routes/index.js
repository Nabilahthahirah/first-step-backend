const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
  res.send("Hello Maha Dwi");
});

module.exports = router;