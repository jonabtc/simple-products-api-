import {Schema, model} from 'mongoose'

const productSchema = new Schema({
    name: String,
    category: String, 
    prie: Number, 
    imageURL: String
},{
    timestamps:true,
    versionKey: false
});

export default model("Product", productSchema);