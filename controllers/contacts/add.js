const { Contact } = require("../../model/contact");

const add = async (req, res) => {
  const newContact = { ...req.body, owner: req.user._id };
  const result = await Contact.create(newContact);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = add;
