import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const artikelSchema = mongoose.Schema({
    judulArtikel: {
        type: String,
        required: true
    },
    isiArtikel: {
        type: String,
        required: true
    },
    penulis: {
        type: String
    },
    tglPosting: {
        type: Date,
        default: Date.now
    }
})

const Artikel = mongoose.model('artikel', artikelSchema);

export default Artikel