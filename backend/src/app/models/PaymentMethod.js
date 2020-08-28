const mongoose = require('../../database');

const PaymentMethodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    parcelsNumber: {
        type: Number,
        required: true,
        default: 1,
    },
    isCashPayment: {
        type: Boolean,
        required: true,
        default: false,
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

const PaymentMethod = mongoose.model('PaymentMethod', PaymentMethodSchema);

module.exports = PaymentMethod;