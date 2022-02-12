import express from "express";
import Article from "../../../models/article_schema.js";
import mongoose from "mongoose";
const articleRouter = express.Router();

// * NOT SPECIFIC ROUTE
articleRouter
    .route("/")
    .get((req, res) => {
        Article.find((err, results) => {
            res.send(results);
        });
    })
    .post(async(req, res) => {
        const { title, content } = req.body;
        // console.log(`${title}: ${content}`);

        Article.create({ title: title, content: content }, (err, article) => {
            if (!err) {
                console.log("Artilce Created");
                res.send(article);
            } else {
                res.sendStatus(403);
            }
        });
        // console.log(req.body);
    })
    .delete((req, res) => {
        Article.deleteMany((err, results) => {
            if (!err) {
                console.log("Deleted count " + results);
                res.send(results);
            } else {
                res.sendStatus(403);
            }
        });
    });

// * SPECIFIC ROUTE by using parameter

// articleRouter
//     .route("/:id")
//     .get((req, res) => {
//         const articleID = req.params.id;
//         Article.findById(articleID, (err, results) => {
//             if (!err) {
//                 console.log("Found");
//                 res.json(results);
//             } else {
//                 console.log(err.message);
//                 res.send({ message: err.message });
//             }
//         });
//     })
//     .put((req, res) => {
//         Article.replaceOne({ _id: req.params.id }, { title: req.body.title, content: req.body.content },
//             (err, result) => {
//                 if (!err) {
//                     console.log("Successfully update document!");
//                     res.json(result);
//                 } else {
//                     console.log(err.message);
//                     res.send(err.message);
//                 }
//             }
//         );
//     })
//     .patch((req, res) => {
//         Article.updateOne({ _id: req.params.id }, req.body, (err, result) => {
//             if (!err) {
//                 console.log("Successfully update document!");
//                 res.json(result);
//             } else {
//                 console.log(err.message);
//                 res.send(err.message);
//             }
//         });
//     })
//     .delete((req, res) => {
//         Article.deleteOne({ _id: req.params.id }, (err, result) => {
//             if (!err) {
//                 console.log("Deleted document!");
//                 res.json(result);
//             } else {
//                 console.log(err.message);
//                 res.send(err.message);
//             }
//         });
//     });

// //* SPECIFIC ROUTE by using query parameter
articleRouter
    .route("/search")
    .get((req, res) => {
        const articleID = req.query.id;
        // console.log(new mongoose.Types.ObjectId(articleID));
        Article.findById(articleID, { _id: 0 }, (err, results) => {
            if (!err) {
                console.log("Found");
                res.json(results);
            } else {
                console.log(err.message);
                res.send({ message: err.message });
            }
        });
    })
    .put((req, res) => {
        const { id, title, content } = req.query;
        // console.log(articleID);
        Article.replaceOne({ _id: id }, { title: title, content: content },
            (err, result) => {
                if (!err) {
                    console.log("Successfully update document!");
                    res.json(result);
                } else {
                    console.log(err.message);
                    res.send(err.message);
                }
            }
        );
    })
    .patch((req, res) => {
        const { id, title, content } = req.query;
        Article.updateOne({ _id: id }, { title: title, content: content },
            (err, result) => {
                if (!err) {
                    console.log("Successfully update document!");
                    res.json(result);
                } else {
                    console.log(err.message);
                    res.send(err.message);
                }
            }
        );
    })
    .delete((req, res) => {
        const id = req.query.id;
        Article.deleteOne({ _id: id }, (err, result) => {
            if (!err) {
                console.log("Deleted document!");
                res.json(result);
            } else {
                console.log(err.message);
                res.send(err.message);
            }
        });
    });

export default articleRouter;