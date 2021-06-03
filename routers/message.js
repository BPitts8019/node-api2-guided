const express = require("express");
const hubs = require("../hubs/hubs-model");

const router = express.Router({
   mergeParams: true
});

router.get("/", async (req, res) => {
   try {
      const data = await hubs.findHubMessages(req.params.id);
      res.json(data);
   } catch (error) {
      res.status(500).json({
         message: "Could not get hub messages"
      });
   }
});

router.get("/:messageId", async (req, res) => {
   try {
      const data = await hubs.findHubMessageById(req.params.id, req.params.messageId);

      if (data) {

      } else {
         
      }
   } catch (error) {
      res.status(500).json({
         message: "Could not get hub messages"
      });
   }
});

router.post("/", async (req, res) => {
   if (!req.body.sender || !req.body.text) {
      return res.status(400).json({
         message: "Need sender and text values"
      });
   }
   const payload = {
      sender: req.body.sender,
      text: req.body.text
   }

   try {
      const data = await hubs.addHubMessage(req.params.id, payload);
      res.status(201).json(data);
   } catch (error) {
      res.status(500).json({
         message: "Could not create hub message"
      });
   }
});

module.exports = router;