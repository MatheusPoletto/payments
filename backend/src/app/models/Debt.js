const mongoose = require('../../database');
const { getNextMonthFromDate } = require('../helpers/functions');

const DebtSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    totalValue: {
        type: Number,
        get: val => {
            return val.toFixed(2);
        },
        set: val => {
            return val ;
        },
        required: false,
        default: 0
    },
    createdDate:{
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    establishment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Establishment',
        required: true
    },
    paymentMethod: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PaymentMethod',
        required: false
    },
    parcels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parcel',
    }],   
});




DebtSchema.methods.generateParcels = function(parcelsNumber) {
    if(this.totalValue == 0)
        return [];

    const valuePerParcel = this.totalValue / parcelsNumber;

    let dueDate = new Date();

    let parcels = [];
    for(let i = 0; i < parcelsNumber; i ++){   
        dueDate = i == 0 ? getNextMonthFromDate(new Date()) : getNextMonthFromDate(dueDate)
        
        const parcel = {
            number: i + 1,
            value: valuePerParcel,
            dueDate,
            debt: this._id
        };

        parcels.push(parcel);
    }

    return parcels;
};

const Debt = mongoose.model('Debt', DebtSchema);

module.exports = Debt;