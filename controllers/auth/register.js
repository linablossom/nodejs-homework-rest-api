const { User } = require("../../model/user");
const { sendResponse } = require("../../helpers");
const gravatar = require("gravatar");
const crypto = require("crypto");
const { sendEmail } = require("../../helpers/sendgrid");
const { verificationEmailTemplate } = require("../../helpers/emailTemplates");

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

  const avatarURL = gravatar.url(email);
  const verifyToken = crypto.randomBytes(32).toString("hex");
  const newUser = new User({ email, avatarURL, verifyToken });

  newUser.setPassword(password);

  await newUser.save();

  const [subject, message] = verificationEmailTemplate(verifyToken);
  await sendEmail({ to: email, subject, message });

  sendResponse({
    res,
    status: 201,
    data: {
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL,
      },
    },
  });
};

module.exports = register;
