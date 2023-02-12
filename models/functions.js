// const fs = require('fs/promises')

const fs = require("fs").promises;

const path = require("path");

const filePath = path.join(__dirname, "contacts.json");

const readFile = async () => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};

const listContacts =  () => {
  return readFile()
}

const getContactById = async (contactId) => {
  const contactsArr = await readFile()
  const findContact =
  contactsArr.find(({ id }) => Number(id) === Number(contactId))
  return findContact
}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
