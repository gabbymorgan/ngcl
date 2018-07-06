const express = require("express");
const Post = require("./PostModel");
const validate = require("../../assets/middlewares/validate");

const router = express.Router();

router
  .get("/", (req, res) => {
    Post.find({})
      .then(posts => res.status(200).json(posts))
      .catch(err => res.status(500).json(err));
  })
  .get("/:postId", (req, res) => {
    const { postId } = req.params;
    Post.findById({ postId })
      .then(post => res.status(200).json(post))
      .catch(err => res.status(500).json(err));
  })
  .post("/", validate, (req, res) => {
    if (!req.user) {
      res.status(400).json({ message: "You are not logged in." });
    } else {
      const { title, text } = req.body;
      console.log(req.user.username);
      const post = new Post({
        username: req.user.username,
        title,
        text
      });
      post
        .save()
        .then(savedPost => res.status(200).json(savedPost))
        .catch(err => res.status(500).json(err));
    }
  })
  .put("/:postId", (req, res) => {
    if (!req.user) {
      res.status(400).json({ message: "You are not logged in." });
    } else {
      const { title, text } = req.body;
      const { postId } = req.params;
      Post.findByIdAndUpdate(postId, { title, text })
        .then(updatedPost => res.status(200).json(updatedPost))
        .catch(err => res.status(500).json(err));
    }
  })
  .delete("/:postId", (req, res) => {
    if (!req.user) {
      res.status(400).json({ message: "You are not logged in." });
    } else {
      const { postId } = req.params;
      Post.findByIdAndRemove(postId)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err));
    }
  });

module.exports = router;
