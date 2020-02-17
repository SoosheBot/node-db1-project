const express = require("express");

const db = require("../data/dbConfig");

const Account = require("./accountDb");

const router = express.Router();

router.get("/", (req,res) => {
    Account.get(req.query)
    .then(account => {
        res.status(200).json(account);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "Could not retrieve accounts database."})
    });
});

router.get("/:id", validateAccountId, (req,res) => {
    const { id } = req.params;
    Account.getById(id)
    .then(account => {
        res.status(200).json(account);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "Could not retrieve account in db with that id."})
    });
})

//middleware
function validateAccountId(req, res, next) {
    // do your magic!
    Account.getById(req.params.id)
    .then(account => {
      if (account) {
        req.account = account;
        next();
      } else {
        res.status(400).json({ errorMessage: "invalid account ID" });
      }
    });
  };
module.exports = router;