const router = require("express").Router();
const Transaction = require("../models/Transaction");
const moment = require('moment-timezone');
const verify = require("../verifyToken");

//CREATE
router.post("/", verify, async (req, res) => {
    const newTransaction = new Transaction(req.body);
    try {
        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (err) {
        res.status(500).json(err);
    }
  });

//GET
router.get("/ticket/:id", verify, async (req, res) => {
    try {
        const transaction = await Transaction.find({ticket: req.params.id},function (err, course) 
        {
            return course;
        });
        let response = [];
        transaction.forEach(element => {
            date = moment(element.createdAt).format('MM-DD-YYYY H:m:s');
            data = 
                {
                    _id:element.id,
                    ticket:element.ticket,
                    buyer:element.buyer,
                    buyAmount:element.buyAmount,
                    price:element.price,
                    buyDate:date
                };

            response.push(data);
        });
        res.status(200).json(response);
      } catch (err) {
        res.status(500).json(err);
      }
});

module.exports = router;