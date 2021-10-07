const { Contact } = require("./contact");

const listContacts = async () => {
  return await Contact.find({}).lean();
};

const getContactById = async (contactId) => {
  return await Contact.findOne({ _id: contactId }).lean();
};

const removeContact = async (contactId) => {
  return await Contact.findByIdAndDelete(contactId);
};

const addContact = async (body) => {
  return await Contact.create(body);
};

const updateContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(contactId, body, { new: true });
};

const updateStatusContact = async (contactId, body) => {
  const { favorite } = body;
  return await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
