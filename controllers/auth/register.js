const { User } = require("../../model/user");
const { sendResponse } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const result = await User.findOne({ email });
  if (result) {
    sendResponse({
      res,
      status: 409,
      statusMessage: "error",
      data: { message: "Email in use" },
    });
    return;
  }

  const newUser = new User({ email });

  newUser.setPassword(password);

  await newUser.save();
  sendResponse({
    res,
    status: 201,
    data: {
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    },
  });
};

module.exports = register;
