const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "contacts.json");

const readFile = async () => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};

const listContacts = () => {
  return readFile();
};

const getContactById = async (contactId) => {
  const contactsArr = await readFile();
  const findContact = contactsArr.find(
    ({ id }) => Number(id) === Number(contactId)
  );
  return findContact;
};

const removeContact = async (contactId) => {
  const contactsArr = await readFile();
  const index = contactsArr.findIndex(
    ({ id }) => Number(id) === Number(contactId)
  );
  if (index !== -1) {
    const filterArr = contactsArr.splice(index, 1);
    await fs.writeFile(filePath, JSON.stringify(contactsArr));
    return filterArr;
  } else {
    return null;
  }
};

const addContact = async (body) => {
  const contactsArr = await readFile();
  const newObj = { id: (contactsArr.length + 1).toString(), ...body };
  contactsArr.push(newObj);
  await fs.writeFile(filePath, JSON.stringify(contactsArr));
  return newObj;
};

const updateContact = async (contactId, body) => {
  const contactsArr = await readFile();
  const { name, email, phone } = body;
  const found = contactsArr.find(({ id }) => Number(id) === Number(contactId));
  if (found) {
    if (name) {
      found.name = name;
    }
    if (email) {
      found.email = email;
    }
    if (phone) {
      found.phone = phone;
    }
    await fs.writeFile(filePath, JSON.stringify(contactsArr));
    return found;
  } else {
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
