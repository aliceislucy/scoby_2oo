const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
require("../config/dbConnection");
const Item = require("../models/Item");
const User = require("../models/User");
const items = [
  {
    name: "Plant Name",
    description: "A beautiful Plant",
    category: "Plant",
    quantity: 3,
    address: "Troca",
    location: {
      coordinates: [2.287592,48.862725],
    },
    formattedAddress: "221 Boulevard Voltaire",
    creator: "the id of the user",
    contact: "phone",
  },
  {
    name: "Plant Name2",
    description: "A beautiful Plant2",
    category: "Plant",
    quantity: 3,
    address: "Sud",
    location: {
      coordinates: [2.368272847167985,48.81911501141138],
    },
    formattedAddress: "221 Boulevard Voltaire",
    creator: "the id of the user",
    contact: "phone",
  },
  {
    name: "Plant Name3",
    description: "A beautiful Plant3",
    category: "Plant",
    quantity: 3,
    address: "20ème",
    location: {
      coordinates: [2.3857823076172036,48.875710277583444],
    },
    formattedAddress: "221 Boulevard Voltaire",
    creator: "the id of the user",
    contact: "phone",
  },
];
User.find()
  .then((userDocuments) => {
    console.log("before for each", items);
    items.forEach((item) => {
      const randomIndex = Math.floor(
        Math.random() * (userDocuments.length - 1 - 0 + 1) + 0
      );
      item.creator = userDocuments[randomIndex]._id;
    });
    Item.create(items)
      .then((itemDocuments) => {
        console.log(itemDocuments);
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(error);
  });
