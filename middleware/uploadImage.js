const multer = require("multer");

let uploadImage = (carpeta) => {
  const storage = multer.diskStorage({
    destination: `public/images/${carpeta}`,
    filename: function (req, file, cb) {
      console.log(file);
      let extension = file.originalname.slice(
        file.originalname.lastIndexOf("."),
        file.originalname.length
      );

      //   let array_nombre = file.originalname.split(".");
      //   let extension2 = array_nombre[array_nombre.length - 1];

      cb(null, Date.now() + extension);
    },
  });

  const upload = multer({ storage: storage }).single("img");
  return upload;
};

module.exports = uploadImage;
