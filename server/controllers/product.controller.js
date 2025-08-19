import { v2 as cloudinary } from "cloudinary"
import Product from '../models/Product.js'

// Add Product : /api/products
export const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body.productData);

        const images = req.files

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
                return result.secure_url;
            })
        )

        await Product.create({...productData, image: imagesUrl})

        res.status(201).json({ success: true, message: 'Product Added' })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message })
    }
}

// Get Product : /api/products
export const productList = async (req, res) => {
    try {
        const products = await Product.find({});

        res.status(200).json({ success: true, products })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message })
    } 
}

// Get Product By Id : /api/products/:id
export const productById = async (req, res) => {
    try {
        const id  = req.params.id
        
        const product = await Product.findOne({_id: id});
        
        res.status(200).json({ success: true, product })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message })
    }
}

// Change Product InStock : /api/products/:id
export const changeStock = async (req, res) => {
    try {
        const { id, inStock }  = req.body;
        
        await Product.findByIdAndUpdate(id, { inStock });
        
        res.status(200).json({ success: true, message: 'Stock updated' })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message })
    }
}

