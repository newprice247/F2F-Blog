
const router = require("express").Router();
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
        console.log(`the user id i can attach is here: ${req.session.user_id}`)
        cb(null, `${Date.now()}-f2f-userID${req.session.user_id}`);
    },
});

const uploadFile = multer({ storage: storage, fileFilter: imageFilter });

const uploadFiles = async (req, res) => {
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
                __dirname + '/resources/static/assets/tmp/' + image.user_id,
                image.data
            );

            return res.send(`File has been uploaded.`);
        });
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload images: ${error}`);
    }
}

router.get("/upload", (req, res) => {
    res.sendFile(path.join(`${__dirname}/../views/images.html`))
});

// router.get("/:id", (req, res) => {
//     res.sendFile(path.join(``))
// })

// router.get('/', async (req, res) => {
//     try {
//         // Get all users, excluding their password
//         const imageData = await Image.findAll({
//             attributes: { include: }
//         });
        
//         res.status(200);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });


// router.get('/:id', async (req, res) =>{
//     try {
//         const imageData = await Image.findByPk(req.params.id);
//         if (!imageData) {
//             res.status(404).json({message: 'No content found with this id!'});
//             return;
//         }
//         res.status(200).json(imageData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.post("/upload", uploadFile.single("file"), uploadFiles);





module.exports = router;