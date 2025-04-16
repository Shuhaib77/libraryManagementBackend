import cloudinary from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();
//  storage  setup
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
});
const storage = multer.diskStorage({});

const uplod = multer({
  storage,
  limits: { fieldSize: 200000000 },
});

//miiddleware to handle multerstorage

const uploadimage = (req, res, next) => {
  uplod.single("image")(req, res, async (error) => {
    if (error) {
      return next(error);
    }

    if (req.file) {
      try {
        console.log(req.file);
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        console.log(result);
        req.cloudinaryImageUrl = result.secure_url;
        console.log(req.cloudinaryImageUrl, "cddc");
      } catch (error) {
        return next(error);
      }
    }
    next();
  });
};

export default uploadimage;
