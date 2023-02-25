const express = require("express");
const Joi = require("joi");
const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact
} = require("../../controlers/contactsControler");

const schemaPost = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .required(),
  phone: Joi.string().max(15).required(),
  favorite: Joi.boolean().optional()
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
  res.status(200).send(await getContacts());
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
  res
    .status(201)
    .json({ message: "contact added" })
    .send(await addContact(validatedBody.value))
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
    return res.status(200).send(await getContactById(req.params.contactId));
  }

  res.status(404).json({ message: "Not found" });
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  if (Object.keys(req.body) === 0) {
   return res.status(400).json({ message: "missing field favorite" });
  }
  const updateFunc = await updateStatusContact(req.params.contactId, req.body)

  if (updateFunc && Object.keys(req.body) !== 0) {
    return res.status(200).send(await getContactById(req.params.contactId));
  }

  res.status(404).json({ message: "Not found" });
});



module.exports = router;
