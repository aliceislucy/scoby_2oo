const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");
const ItemModel = require("../models/Item");

router.get("/", (req, res, next) => {
  console.log("THIS IS REQ SESSION");
  console.log(req.session.currentUser)
  UserModel.findById(req.session.currentUser)
    .then((currentUser) => {
      // console.log("THIS IS CURRENT USER");
      // console.log(currentUser);
      res.status(200).json(currentUser);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.patch("/", (req, res, next) => {
  UserModel.findByIdAndUpdate(req.session.currentUser, req.body, {
    new: true,
  })
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.get("/items", (req, res, next) => {
  // console.log("hello");
  ItemModel.find({ creator: req.session.currentUser })
    .then((ItemDocuments) => {
      // res.render("yourview.hbs", { Items: ItemDocuments }); // Module 2
      res.status(200).json(ItemDocuments);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});
module.exports = router;
