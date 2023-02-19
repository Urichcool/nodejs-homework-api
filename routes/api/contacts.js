const express = require("express");
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/functions");

const schemaPost = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().max(15).required(),
});

const schemaPut = Joi.object({
  id: Joi.string(),
  name: Joi.string(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().max(15),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.status(200).send(await listContacts());
});

router.get("/:contactId", async (req, res, next) => {
  const getContacts = await getContactById(req.params.contactId);

  if (getContacts) {
    return res.status(200).send(getContacts);
  }
  res.status(404).json({ message: "Not found" });
});

router.post("/", async (req, res, next) => {
  const validatedBody = schemaPost.validate(req.body);
  const { error } = validatedBody;
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  res.status(201).send(await addContact(validatedBody.value));
});

router.delete("/:contactId", async (req, res, next) => {
  const removeFunc = await removeContact(req.params.contactId);
  if (removeFunc) {
    return res.status(200).json({ message: "contact deleted" });
  }
  res.status(404).json({ message: "Not found" });
});

router.patch("/:contactId", async (req, res, next) => {
  const validatedBody = schemaPut.validate(req.body);
  const { error } = validatedBody;

  if (Object.keys(validatedBody.value).length === 0) {
    return res.status(400).json({ message: "Missed Fields" });
  }

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const updateFunc = await updateContact(
    req.params.contactId,
    validatedBody.value
  );
  if (updateFunc) {
    return res.status(200).send(updateFunc);
  }

  res.status(404).json({ message: "Not found" });
});

module.exports = router;
