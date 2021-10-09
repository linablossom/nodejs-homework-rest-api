const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../model/user");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public/avatars");

const avatar = async (req, res) => {
  const { path: tempStorage, originalname } = req.file;
  try {
    const [extention] = originalname.split(".").reverse();
    const avatar = `avatar${req.user._id}.${extention}`;
    const resultStorage = path.join(avatarsDir, avatar);
    const file = await Jimp.read(tempStorage);
    file.resize(250, 250).write(resultStorage);
    const avatarURL = path.join("/avatars", avatar);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.status(200).json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(tempStorage);
    throw error;
  }
};

module.exports = avatar;
