import Product from "../models/product"

export const createProduct = async (request, response) => {

    const {name, category, price, imgURL} = request.body;
    const newProduct = new Product({name, category, price, imgURL});

    const productSaved = await newProduct.save()
    
    response.status(201).json(productSaved);
}

export const getProducts = (request, response) => { response.json("hola")}

export const getProductById = (request, response) => {}

export const updateProductById = (request, response) => {}

export const deleteProductById = (request, response) => {}