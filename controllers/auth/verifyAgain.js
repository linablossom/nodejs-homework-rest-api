const { User } = require("../../model/user");
const { verificationEmailTemplate } = require("../../helpers/emailTemplates");
const { sendEmail } = require("../../helpers/sendgrid");

const verifyAgain = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "missing required field email",
    });
    return;
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "User not found",
    });
    return;
  }
  if (user.verify) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Verification has already been passed",
    });
    return;
  }

  const [subject, message] = verificationEmailTemplate(user.verifyToken);
  await sendEmail({ to: user.email, subject, message });

  res.json({
    status: "success",
    code: 200,
    message: "Verification email sent",
  });
};

module.exports = verifyAgain;
