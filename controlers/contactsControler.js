const {Contact} = require('../db/contactModel');


const getContacts = async (req, res) => {
  return await Contact.find({})
};


const getContactById = async (contactId) => {
  // const contactsArr = await readFile();
  // const findContact = contactsArr.find(
  //   ({ id }) => Number(id) === Number(contactId)
  // );
  // return findContact;
};

const removeContact = async (contactId) => {
  // const contactsArr = await readFile();
  // const index = contactsArr.findIndex(
  //   ({ id }) => Number(id) === Number(contactId)
  // );
  // if (index !== -1) {
  //   const filterArr = contactsArr.splice(index, 1);
  //   await fs.writeFile(filePath, JSON.stringify(contactsArr));
  //   return filterArr;
  // }
  // return null;
};

const addContact = async (body) => {
  // const contactsArr = await readFile();
  // const newObj = { id: (contactsArr.length + 1).toString(), ...body };
  // contactsArr.push(newObj);
  // await fs.writeFile(filePath, JSON.stringify(contactsArr));
  // return newObj;
};

const updateContact = async (contactId, body) => {
  // const contactsArr = await readFile();
  // const { name, email, phone } = body;
  // const found = contactsArr.find(({ id }) => Number(id) === Number(contactId));
  // if (found) {
  //   if (name) {
  //     found.name = name;
  //   }
  //   if (email) {
  //     found.email = email;
  //   }
  //   if (phone) {
  //     found.phone = phone;
  //   }
  //   await fs.writeFile(filePath, JSON.stringify(contactsArr));
  //   return found;
  // }
  // return null;
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
