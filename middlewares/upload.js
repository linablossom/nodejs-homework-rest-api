const multer = require("multer");
const path = require("path");

const uploadDir = path.join(__dirname, "../", "temp");

const multerSetting = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2058,
  },
});

const upload = multer({
  storage: multerSetting,
});

module.exports = upload;
