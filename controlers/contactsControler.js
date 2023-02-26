const { Contact } = require("../db/contactModel");

const getContacts = async () => {
  return await Contact.find({});
};

const getContactById = async (contactId) => {
  if (contactId.length === 24) {
    return await Contact.findById(contactId);
  }
};

const removeContact = async (contactId) => {
  if (contactId.length === 24) {
    return await Contact.findByIdAndRemove(contactId);
  }
};

const addContact = async (body) => {
  const { name, email, phone, favorite = false } = body;
  const contact = new Contact({ name, email, phone, favorite });
  await contact.save();
};

const updateContact = async (contactId, body) => {
  if (contactId.length === 24) {
    const { name, email, phone } = body;
    return await Contact.findByIdAndUpdate(contactId, { $set: { name, email, phone } });
  }
};

const updateStatusContact = async (contactId, body) => {
  if (contactId.length === 24) {
    const { favorite } = body;
    if (favorite) {
        return await Contact.findByIdAndUpdate(contactId, {
          $set: { favorite },
        });
    }
  }
}

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
};
