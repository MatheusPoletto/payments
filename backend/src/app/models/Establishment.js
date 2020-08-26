const mongoose = require('../../database');

const EstablishmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});


const Establishment = mongoose.model('Establishment', EstablishmentSchema);

module.exports = Establishment;