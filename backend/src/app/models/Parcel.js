const mongoose = require('../../database');

const ParcelSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    barcode: {
        type: String,
        required: false
    },
    value: {
        type: Number,
        get: val => {
            return (val / 100).toFixed(2);
        },
        set: val => {
            return num * 100;
        },
        required: false,
        default: 0
    },
    dueDate:{
        type: Date,        
    },
    paymentDate:{
        type: Date,        
    },
    paymentUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    debt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Debt',
        required: true
    },
});


const Parcel = mongoose.model('Parcel', ParcelSchema);

module.exports = Parcel;