const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/functions");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.status(200).send(await listContacts());
});

router.get("/:contactId", async (req, res, next) => {
  const getContacts = await getContactById(req.params.contactId);

  if (getContacts) {
    res.status(200).send(getContacts);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (name && email && phone) {
    res.status(201).send(await addContact(req.body));
  } else {
    res.status(400).json({ message: "missing required name field" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const removeFunc = await removeContact(req.params.contactId);
  if (removeFunc) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing fields" });
  } else {
    const updateFunc = await updateContact(req.params.contactId, req.body);
    if (updateFunc) {
      res.status(200).send(updateFunc);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  }
});

module.exports = router;
