const express = require("express");
const router = express.Router();
const ItemModel = require("../models/Item");

/**
 * Router is prefixed with /api/item
 *
 */

// GET http://localhost:2021/api/item (R)ead

router.get("/", (req, res, next) => {
  // console.log("hello");
  ItemModel.find()
    .then((ItemDocuments) => {
      // res.render("yourview.hbs", { Items: ItemDocuments }); // Module 2
      res.status(200).json(ItemDocuments);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// GET http://localhost:2021/api/item/theIdOfAItem (R)ead
router.get("/:id", (req, res, next) => {
  ItemModel.findById(req.params.id)
    .then((ItemDocument) => {
      res.status(200).json(ItemDocument);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// POST http://localhost:2021/api/item   (C)reate
router.post("/", (req, res, next) => {
  // const newItem = { ...req.body };

  // newItem.image = "feauhfuaehfueoafaueofa"
  const { name, price, image } = req.body;

  if (!name) {
    return res.status(400).json({ message: "No empty fields please !" });
  }

  const newItem = {
    name,
    price,
    image,
  };

  ItemModel.create(newItem)
    .then((ItemDocument) => {
      res.status(201).json(ItemDocument);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

//  PATCH http://localhost:2021/api/item/theIdOfAItem (U)pdate

router.patch("/:id", (req, res, next) => {
  ItemModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((ItemDocument) => {
      res.status(200).json(ItemDocument);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

//  DELETE http://localhost:2021/api/item/theIdOfAItem (D)elete

router.delete("/:id", (req, res, next) => {
  ItemModel.findByIdAndDelete(req.params.id)
    .then((ItemDocument) => {
      // res.status(200).json(ItemDocument);
      res.sendStatus(204);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

module.exports = router;
