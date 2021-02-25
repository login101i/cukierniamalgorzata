const Product = require('../models/product')



exports.getProducts = async (req, res, next) => {

    const products = await Product.find()
    const productsCount = await Product.countDocuments();

    res.status(200).json({
        success: true,
        productsCount,
        products,


    })
}


exports.newProduct = async (req, res, next) => {

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
}

exports.getSingleProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    console.log(product)

    if (!product) {
        res.status(404).json({
            success: false,
            message: "Nie znaleziono produktu"
        })
    }
    res.status(200).json({
        success: true,
        product
    })
}



// Update Product   =>   /api/v1/admin/product/:id
exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404).json({
            success: false,
            message: "Nie znaleziono produktu"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
}

// Delete Product   =>   /api/v1/admin/product/:id
exports.deleteProduct = async (req, res, next) => {

    let product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404).json({
            success: false,
            message: "Nie znaleziono produktu"
        })
    }
    product = await product.remove()
    res.status(200).json({
        message: "Pomyślnie usunięto poniższy produkt",
        product
    })
}
