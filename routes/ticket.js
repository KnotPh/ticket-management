const router = require("express").Router();
const Ticket = require("../models/Ticket");
const verify = require("../verifyToken");

//CREATE

router.post("/", verify, async (req, res) => {
    const newTicket = new Ticket(req.body);
    try {
        const savedTicket = await newTicket.save();
        res.status(201).json(savedTicket);
    } catch (err) {
        res.status(500).json(err);
    }
  });

//UPDATE
router.put("/:id", verify, async (req, res) => {

    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
        },
        { new: true }
        );
        res.status(200).json(updatedTicket);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET
router.get("/:id", verify, async (req, res) => {
    try {
      const ticket = await Ticket.findById(req.params.id);
      res.status(200).json(ticket);
    } catch (err) {
      res.status(500).json(err);
    }
});

//GET ALL
router.get("/", verify, async (req, res) => {
    try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
    } catch (err) {
    res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
    try {
        await Ticket.findByIdAndDelete(req.params.id);
        res.status(200).json("Ticket has been deleted.");
    } catch (err) {
        res.status(500).json(err);
    }
  });
  

module.exports = router;