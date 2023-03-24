const mongoose = require('mongoose')


const carSchema = new mongoose.Schema(
    {
    registration:{
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        default: true
    },
    photo: {
        type:String,
        default:true
    }
    
},
{
    timestamps: true
}
)

module.exports = mongoose.model('Car', carSchema)