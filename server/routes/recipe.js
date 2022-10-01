const Product = require("../models/Product");
const { verifyTokenAndAuthorization } = require("./verifyToken");

const router = require("express").Router();

router.post("/", verifyTokenAndAuthorization, async (req, res) => {
    const product = new Product(req.body);

    try {
        const savedProduct = await product.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get("/", async (req, res) => {
    const product = await Product.find();

    try {
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get("/search/:key", async (req, res) => {
    const result = await Product.find({
        "$or": [
            {
                title: { $regex: req.params.key, $options: 'i' }
            }, {
                ingredients: { $regex: req.params.key, $options: 'i' }
            }
        ]
    });

    try {
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/find/:id", async (req, res) => {

    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);

    } catch (err) {
        res.status(500).json(err);
    }
})

router.get("/user/:key", async (req, res) => {

    try {
        const product = await Product.find({
            user_id:  req.params.key
        });
        res.status(200).json(product);

    } catch (err) {
        res.status(500).json(err);
    }
})


router.delete("/delete/:id", async (req, res) => {

    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json(product);

    } catch (err) {
        res.status(500).json(err);
    }
})


router.put("/update/:id", async (req, res) => {

    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{
            $set: req.body
        }, { new: true });
        res.status(200).json(updatedProduct);

    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;