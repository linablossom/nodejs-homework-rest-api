const { User } = require("../../model/user");

const verify = async (req, res) => {
  const { verifyToken } = req.params;
  const user = await User.findOne({ verifyToken });
  if (!user) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "User not found",
    });
    return;
  }

  user.verifyToken = null;
  user.verify = true;
  await user.save();

  res.json({
    status: "success",
    code: 200,
    message: "Verification successful",
  });
};

module.exports = verify;
