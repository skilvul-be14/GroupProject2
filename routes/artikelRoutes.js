import express from "express";

const router = express.Router();

import Artikel from "../Model/artikelModel.js";

import { createArtikel, updateArtikel, getArtikelById, getAllArtikel, deleteArtikelById, deleteAllArtikel } from '../controller/artikelController.js'

import protect from '../middleware/authUser.js';

//admin
router.route('/artikel').post(protect, createArtikel);
router.route('/artikel/:id').put(protect, updateArtikel);
router.route('/artikel/:id').delete(protect, deleteArtikelById);
router.route('/artikel').delete(protect, deleteAllArtikel);

//uset
router.route('/artikel/:id').get(getArtikelById);
router.route('/artikel').get(getAllArtikel);


export default router;