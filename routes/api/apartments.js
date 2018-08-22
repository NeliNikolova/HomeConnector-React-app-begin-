const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Post model
const Apartment = require("../../models/Apartment");
// Profile model
const Profile = require("../../models/Profile");

// @route   GET api/apartments
// @desc    Get apartments
// @access  Public
router.get("/", (req, res) => {
  Apartment.find()
    .sort({ date: -1 })
    .then(apartments => res.json(apartments))
    .catch(err =>
      res.status(404).json({ noapartmentsfound: "No apartments found" })
    );
});
module.exports = router;
