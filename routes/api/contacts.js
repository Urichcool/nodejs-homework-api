const express = require('express')
const {
  listContacts, getContactById
} = require('../../models/functions');

const router = express.Router()

router.get('/', async (req, res, next) => {
  res.status(200).send(await listContacts());
})

router.get('/:contactId', async (req, res, next) => {
  const getContacts = await getContactById(req.params.contactId)
  if (getContacts) {
    res.status(200).send(getContacts)
  }
  else {
    res.status(404).json({ message: "Not found" });
  }
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
