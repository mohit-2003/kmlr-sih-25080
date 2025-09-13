const multer = require("multer");
const { UPLOAD_FOLDER } = require("../config/config");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_FOLDER),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

module.exports = upload;
