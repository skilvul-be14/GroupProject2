import asyncHandler from 'express-async-handler';
import Artikel from '../Model/artikelModel.js';


//Create Artikel
const createArtikel = asyncHandler( async (req, res) => {
    const { judulArtikel, isiArtikel, penulis, tglPosting } = req.body
    const artikel = await Artikel.create({ judulArtikel, isiArtikel, penulis, tglPosting });

    if(artikel){
        res.status(200).json({
            success: true,
            message: 'Artikel has created',
            artikel: artikel
        })
    } else{
        res.status(400).json({
            success: false,
            message: 'Something went wrong'
        })
    }
})


//Update Artikel
const updateArtikel = asyncHandler( async (req, res) => {
    const { judulArtikel, isiArtikel, penulis, tglPosting } = req.body
    const existArtikel = await Artikel.findOne({ _id: req.params.id})

    if(existArtikel){
        existArtikel.judulArtikel = judulArtikel;
        existArtikel.isiArtikel = isiArtikel;
        existArtikel.penulis = penulis;
        const updateArtikel = await existArtikel.save();
        res.status(200).json({
            success: true,
            data: updateArtikel,
            message: 'Artikel has updated successfully'
        })
    } else{
        res.status(400).json({
            success: false,
            data: null,
            message: 'Artikel is Not Found'
        })
    }
})


//get artikel by id
const getArtikelById = asyncHandler (async (req, res) => {
    const existArtikel = await Artikel.findOne({ _id: req.params.id})
    if(existArtikel){
        res.status(200).json({
            success: true,
            data: existArtikel,
            message: 'Article is fetched successfully'
        })
    } else{
        res.status(400).json({
            success: false,
            data: null,
            message: 'Article is Not Found'
        })
    }   
})


//get all article
const getAllArtikel = asyncHandler(async (req, res) => {
    const allArtikel = await Artikel.find({})
    if(allArtikel){
        res.status(200).json({
            success: true,
            data: allArtikel,
            message: 'All articles are fetched successfully'
        })
    } else{
        res.status(400).json({
            success: false,
            data: null,
            message: 'Articles are Not Found'
        })
    }
})


//delete article by id
const deleteArtikelById = asyncHandler (async (req, res) => {
    const existArtikel = await Artikel.findOne({ _id : req.params.id})
    if(existArtikel){
        await existArtikel.remove();
        res.status(200).json({
            success: true,
            message: 'article is deleted successfulle'
        })
    } else{
        res.status(400).json({
            success: false,
            message: 'article is not found'
        })
    }
})


//delete all article
const deleteAllArtikel = asyncHandler (async (req, res) => {
    const allArtikel = await Artikel.remove({})
    if(allArtikel){
        res.status(200).json({
            success: true,
            message: 'All article are deleted successfully'
        })
    } else{
        res.status(400).json({
            success: false,
            message: 'Articles are Not Found'
        })
    }
})


export {
    createArtikel,
    updateArtikel,
    getArtikelById,
    getAllArtikel,
    deleteArtikelById,
    deleteAllArtikel
}