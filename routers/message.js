const express = require("express");
const hubs = require("../hubs/hubs-model.js");

const router = express.Router({
   mergeParams: true,
});

router.get("/", (req, res) => {
   hubs
      .findHubMessages(req.params.id)
      .then((data) => {
         res.json(data);
      })
      .catch((error) => {
         res.status(500).json({
            message: "Unable to retrieve Hub messages",
            error,
         });
      });
});

router.get("/:msgId", (req, res) => {
   const { id: hubId, msgId } = req.params;

   hubs
      .findHubMessageById(hubId, msgId)
      .then((data) => {
         if (data) {
            res.json(data);
            return;
         }

         res.status(404).json({
            message: "Message not found",
         });
      })
      .catch((error) => {
         res.status(500).json({
            message: "Unable to retrieve Hub message",
            error,
         });
      });
});

router.post("/", (req, res) => {
   const { sender, text } = req.body;

   if (!sender || !text) {
      res.status(400).json({
         message: "You must include a sender and a message",
      });
      return;
   }

   const payload = {
      sender,
      text,
   };

   hubs
      .addHubMessage(req.params.id, payload)
      .then((data) => {
         res.status(201).json(data);
      })
      .catch((error) => {
         res.status(500).json({
            message: "Unable to create Hub message",
            error,
         });
      });
});

module.exports = router;
