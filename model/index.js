const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");
const contactsPath = path.resolve(__dirname, "./contacts.json");

const listContacts = async () => {
  return await loadContacts();
};

const getContactById = async (contactId) => {
  const contacts = await loadContacts();
  return contacts.find((x) => x.id == contactId);
};

const removeContact = async (contactId) => {
  const contacts = await loadContacts();
  const contactIndex = contacts.findIndex((x) => x.id == contactId);
  if (contactIndex === -1) return null;
  const contact = contacts[contactIndex];
  contacts.splice(contactIndex, 1);
  await saveContacts(contacts);
  return contact;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await loadContacts();
  const newContact = { id: v4(), name, email, phone: +phone };
  contacts.push(newContact);
  await saveContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contacts = await loadContacts();
  const contact = contacts.find((x) => x.id == contactId);
  if (!contact) return null;
  contact.name = name;
  contact.email = email;
  contact.phone = +phone;
  await saveContacts(contacts);
  return contact;
};

async function loadContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function saveContacts(contacts) {
  const data = JSON.stringify(contacts);
  await fs.writeFile(contactsPath, data, { encoding: "utf8", flag: "w" });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
