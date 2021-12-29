import Product from "../models/product"

export const createProduct = async (request, response) => {

    const {name, category, price, imgURL} = request.body;
    const newProduct = new Product({name, category, price, imgURL});

    const productSaved = await newProduct.save()
    
    response.status(201).json(productSaved);
}

export const getProducts = async (_, response) => { 
    const products = await Product.find()
    response.json(products)
}

export const getProductById = async (request, response) => {
    const product = await Product.findById(request.params.productId);

    response.json(product)
}

export const updateProductById = async (request, response) => {
    await Product.findByIdAndUpdate(request.params.productId, request.body, {
        new: true
    })

    response.status(204).json()
}

export const deleteProductById = async (request, response) => {}