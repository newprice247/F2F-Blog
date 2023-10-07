
const router = require("express").Router();
// const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");
const upload = require("../utils/upload");
const path = require("path");
const fs = require('fs');

const multer = require('multer');

const Image = require('../models/Image');


const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb('Please upload only images.', false);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/resources/static/assets/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-f2f-${file.originalname}`);
    },
});

const uploadFile = multer({ storage: storage, fileFilter: imageFilter });

const uploadFiles = async (req, res) => {
    try {
        console.log(req.file);

        if (req.file == undefined) {
            return res.send(`You must select a file.`);
        }

        Image.create({
            type: req.file.mimetype,
            name: req.file.originalname,
            data: fs.readFileSync(
                __dirname + '/resources/static/assets/uploads/' + req.file.filename
            ),
        }).then((image) => {
            fs.writeFileSync(
                __dirname + '/resources/static/assets/tmp/' + image.name,
                image.data
            );

            return res.send(`File has been uploaded.`);
        });
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload images: ${error}`);
    }
}


router.get("/", (req, res) => {
    res.sendFile(path.join(`${__dirname}/../views/images.html`))
});

router.post("/upload", uploadFile.single("file"), uploadFiles);





module.exports = router;