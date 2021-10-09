const { Contact } = require("../../model/contact");

const getAll = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find(
    {
      owner: req.user._id,
    },
    "",
    {
      skip,
      limit: +limit,
    }
  ).populate("owner", "_id email");
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getAll;
