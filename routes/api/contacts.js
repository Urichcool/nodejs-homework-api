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
    res.status(200).send(getContacts);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const validatedBody = schemaPost.validate(req.body);
  const { name, email, phone } = validatedBody.value;
  const { error } = validatedBody;
  if (name && email && phone && !error) {
    res.status(201).send(await addContact(validatedBody.value));
  } else {
    res.status(400).json({ message: error.details[0].message });
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
  const validatedBody = schemaPut.validate(req.body);
  const { error } = validatedBody;
  if (Object.keys(validatedBody.value).length === 0 || error) {
    const isValidationError = (error) => {
      if (error) {
        return { message: error.details[0].message };
      } else {
        return { message: "Missed Fields" };
      }
    };
    res.status(400).json(isValidationError(error));
  } else {
    if (!error) {
      const updateFunc = await updateContact(
        req.params.contactId,
        validatedBody.value
      );
      if (updateFunc) {
        res.status(200).send(updateFunc);
      } else {
        res.status(404).json({ message: "Not found" });
      }
    }
  }
});

module.exports = router;
