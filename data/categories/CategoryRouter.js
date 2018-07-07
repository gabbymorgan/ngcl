const express = require("express");
const Category = require("./CategoryModel");
const adminValidate = require("../../assets/middlewares/adminValidate");

const router = express.Router();

router
  .get("/", (req, res) => {
    Category.find({})
      .then(categories => res.status(200).json(categories))
      .catch(err => res.status(500).json(err));
  })
  .get("/:categoryId", (req, res) => {
    const { categoryId } = req.params;
    Category.findById({ categoryId })
      .then(category => res.status(200).json(category))
      .catch(err => res.status(500).json(err));
  })
  .post("/", adminValidate, (req, res) => {
    if (!req.user) {
      res.status(400).json({ message: "You are not logged in as a user with that permission." });
    } else {
      let { name, parentName, ancestorNames } = req.body;

      if (!parentName && !ancestorNames) {
        const category = new Category({
          name,
        });
        category
        .save()
        .then(savedCategory => res.status(200).json(savedCategory))
        .catch(err => res.status(500).json({ message: "Server failed to save new Category."}));
      }

      else if (!parentName && ancestorNames) {
        res.status(422).json({ message: "Cannot have ancestors without a parent. Please revise data and send again."})
      }

      else {
      //get parent ID from name
        Category
          .find({ "name": parentName }).select("_id")
          .then(parent => {
            const parentId = parent[0]._id;
            //get each ancestor ID from name
            Category
              .find({ "name": { $in: ancestorNames }}).select("_id")
              .then(ancestors => {
                const ancestorIds = ancestors.map(ancestor => ancestor._id);
                //create new category and save to db
                console.log(ancestorIds);
                const category = new Category({
                  parentId,
                  ancestorIds,
                  name,
                });
                category
                  .save()
                  .then(savedCategory => res.status(200).json(savedCategory))
                  .catch(err => res.status(500).json({ message: "Server failed to save new Category."}));
              }).catch(err => res.status(404).json({ message: "Ancestor data not found. Please check your ancestor names and try again."}));
            }).catch(err => res.status(500).json({ message: "Parent data not found. Please check your parent name and try again."}));
          }
        }
  })
  // TODO: UPDATE PUT REQUEST TO ALLOW AUTHED USERS TO UPDATE NEW CATEGORY DATA
  // .put("/:categoryId", (req, res) => {
  //   if (!req.user) {
  //     res.status(400).json({ message: "You are not logged in." });
  //   } else {
  //     const { name, parent, ancestorNames } = req.body;
  //     const { categoryId } = req.params;
  //     Category.findByIdAndUpdate(categoryId, { name, parent, ancestorNames })
  //       .then(updatedCategory => res.status(200).json(updatedCategory))
  //       .catch(err => res.status(500).json(err));
  //   }
  // })
  .delete("/:categoryId", (req, res) => {
    if (!req.user) {
      res.status(400).json({ message: "You are not logged in." });
    } else {
      const { categoryId } = req.params;
      Category.findByIdAndRemove(categoryId)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err));
    }
  });

module.exports = router;
