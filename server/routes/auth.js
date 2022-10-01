const express = require("express");
const User = require("../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");


router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    try {
        const currentUser = await newUser.save();

        const accessToken = jwt.sign({
            id: newUser._id,
        }, process.env.JWT_SEC,
            { expiresIn: "3d" }
        );
        console.log("Register TOKEN: " , accessToken);

        res.status(200).json({ ...currentUser._doc, accessToken });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.post("/login", async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(404).json("Wrong credential");

    if (req.body.password !== user.password) {
        res.status(404).json("Wrong credential");
        return;
    }

    const accessToken = jwt.sign({
        id: user._id,
    }, process.env.JWT_SEC,
        { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc
    res.status(200).json({ accessToken, ...others });
});

module.exports = router;