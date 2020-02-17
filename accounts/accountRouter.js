const express = require("express");

const db = require("../data/dbConfig");

const Account = require("./accountDb");

const router = express.Router();

router.get("/", (req, res) => {
  Account.get(req.query)
    .then(account => {
      res.status(200).json(account);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "Could not retrieve accounts database." });
    });
});

router.get("/:id", validateAccountId, (req, res) => {
  const { id } = req.params;
  Account.getById(id)
    .then(account => {
      res.status(200).json(account);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({
          errorMessage: "Could not retrieve account in db with that id."
        });
    });
});

router.post("/", validateAccount, (req,res) => {
    const accounts = { ...req.body};
    Account.insert(accounts)
    .then(account => {
        res.status(201).json(account);
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({
            errorMessage: "Could not post to this account."
          });
      });
});

router.put("/:id", validateAccountId, validateAccount, (req,res) => {
    const accounts = { ...req.body };
    const { id } = req.params;
    Account.update(id, accounts)
      .then(account => {
        res.status(201).json(account);
      })
      .catch(err => {
        res.status(500).json({ error: "Could not update account at this ID" });
      });
});

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

function validateAccount(req,res,next) {
    if (req.body.name && req.body.budget) {
        next();
    } else if (!req.body.name) {
        res.status(400).json({ error: "Please add name"});
    } else {
        res.status(400).json({ error: "Please add name and budget"});
    }
};


module.exports = router;
