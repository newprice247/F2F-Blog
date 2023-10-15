
const router = require("express").Router();
const path = require("path");
const fs = require('fs');
const baseDir = process.cwd();
const multer = require('multer');

const { Image, ContentImage } = require('../models');

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
        console.log(`the user id i can attach is here: ${req.session.user_id}`)
        cb(null, `${req.session.user_id}`);
    },
});

const uploadFile = multer({ storage: storage, fileFilter: imageFilter });

const uploadProfilePic = async (req, res) => {
    try {
        console.log(req.file);
        console.log(req.session.user_id)

        if (req.file == undefined) {
            return res.send(`You must select a file.`);
        }

        Image.create({
            type: req.file.mimetype,
            name: req.file.originalname,
            data: fs.readFileSync(
                __dirname + '/resources/static/assets/uploads/' + req.file.filename
            ),
            user_id: req.session.user_id,
        }).then((image) => {
            fs.writeFileSync(
                baseDir + '/public/images/tmp/' + req.session.user_id + '.jpg',
                image.data
            );

            return res.sendFile(path.join(`${__dirname}/../public/html/crud.html`));
        });
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload images: ${error}`);
    }
}

const uploadContentImage = async (req, res) => {
    try {
        console.log(req.file);
        console.log(req.session.user_id)

        if (req.file == undefined) {
            return res.send(`You must select a file.`);
        }

        ContentImage.create({
            type: req.file.mimetype,
            name: req.file.originalname,
            data: fs.readFileSync(
                __dirname + '/resources/static/assets/uploads/' + req.file.filename
            ),
            content_id: req.content_id,
        }).then((image) => {
            fs.writeFileSync(
                baseDir + '/public/images/contentImages/' + req.content_id + '.jpg',
                image.data
            );

            return res.sendFile(path.join(`${__dirname}/../public/html/crud.html`));
        });
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload images: ${error}`);
    }
}

router.get("/upload", (req, res) => {
    res.sendFile(path.join(`${__dirname}/../views/images.html`))
});

router.get('/profilePic', async (req, res) =>{
    try {
        const imageData = await Image.findOne({where: {user_id: req.session.user_id}})
        if (!imageData) {
            res.status(404).json({message: 'No content found with this id!'});
            return;
        }
        res.setHeader('Content-Type', imageData.type);
        res.status(404).send(imageData.data);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/upload", uploadFile.single("file"), uploadProfilePic);

router.post("/contentImage", uploadFile.single("file"), uploadContentImage);



module.exports = router;